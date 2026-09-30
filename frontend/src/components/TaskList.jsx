import TaskCard from "./TaskCard";
import "./style/TaskList.css"

function TaskList({tasks}){
    return (
        <div className="tasks">
        {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      </div>
    );
}

export default TaskList;