<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return Task::where('user_id', $request->user()->id)->get();
    }
//'user_id' decides what you can do
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'status' => 'nullable|string',
            'priority' => 'required|string',
        ]);
        $data['user_id'] = $request->user()->id;
        $task = Task::create($data);
        return response()->json($task, 201);
    }

    public function show(string $id, Request $request)
    {
        return Task::where('id', $id)
        ->where('user_id', $request->user()->id)
        ->firstOrFail();
    }

    public function update(Request $request, string $id)
    {
       $task = Task::where('id', $id)
        ->where('user_id', $request->user()->id)
        ->firstOrFail();

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy(Request $request, string $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $task->delete();

        return response()->json(null, 204);
    }
}