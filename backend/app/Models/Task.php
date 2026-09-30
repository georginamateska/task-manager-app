<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{//sto smee da se popolnuva so create i update
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'due_date',
        'status',
        'priority'
    ];
    protected $appends = ['dueDate'];

    public function getDueDateAttribute(){
        return $this->getRawOriginal('due_date');
    }
}
