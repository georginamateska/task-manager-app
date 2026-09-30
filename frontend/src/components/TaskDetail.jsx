import { useParams, Link } from "react-router-dom";
import AddTask from "./AddTask";
import "./style/TaskDetail.css";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskDetail({
  darkMode,
  onDarkMode,
  totalTasks,
  completedTasks,
  remainingTasks,
}) {
  const { id } = useParams(); //get the string-id with this

  const {
    tasks,
    handleDeleteTask,
    handleAddTask,
    handleUpdateTask,
    editingTask,
    handleEditClick,
    handleCancelEdit,
  } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="dashboard">
        <p>Task not found.</p>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <div className="task-list">
        <div className="back">
          <Link to="/">← Back</Link>
        </div>


        <div className="border">
          <div className="card-large">
            <h1>Title: {task.title}</h1>

            <h2 className="desc-label">Description: </h2>
            <div className="description-box">
              <span>{task.description}</span>
            </div>

            <h3>Due date: {task.dueDate}</h3>

          <div className="task-info">
            <h4>Priority: {task.priority}</h4>
            <h5>Status: {task.status}</h5>
          </div>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => handleEditClick(task)}
            className="card-buttons"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${task.title}"?`))
                handleDeleteTask(task.id);
            }}
            className="card-buttons"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="wide-side-bar">
        <div className="add-task">
          <AddTask
            onAddTask={handleAddTask}
            initialTask={editingTask}
            onUpdateTask={handleUpdateTask}
            onCancelEdit={handleCancelEdit}
            darkMode={darkMode}
            onDarkMode={onDarkMode}
          />
        </div>
        <div className="wide-filter-bar">
          <div className="statistics">
            <p>Total: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Remaining Tasks: {remainingTasks}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
