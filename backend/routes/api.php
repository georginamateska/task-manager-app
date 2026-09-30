<?php
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

//checks if valid token
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);

    Route::post('/logout', function (Request $request){
    $request->user()->currentAccessToken()->delete();
//logout deletes the token
    return response()->json([
        'message' => 'Logged out successfully'
    ]);
});
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

