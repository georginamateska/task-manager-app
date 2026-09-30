import "./style/TaskCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function getProgressPercent(status) {
  if (status === "done") return 100;
  if (status === "in-progress") return 40;
  return 0; // todo
}
function getProgressColor(status) {
  if (status === "done") return "linear-gradient(90deg, #a6d1f2, #7ca2cf)";
  if (status === "in-progress")
    return "linear-gradient(90deg, #a6d1f2, #7ca2cf)";
  return "linear-gradient(90deg, #a6d1f2, #7ca2cf)";
}
function TaskCard({ task }) {
  const navigate = useNavigate();

  const { handleDeleteTask, handleEditClick } = useContext(TaskContext);

  const progress = getProgressPercent(task.status);
  const progressColor = getProgressColor(task.status);

  return (
    <>
      <div className="card">
        <div
          className="card-data"
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          <div className="card-front">
            <h1>Title: <span>{task.title}</span></h1>
            <p>Priority: <span>{task.priority}</span></p>


            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%`, background: progressColor }}
              ></div>
              <div className="progress-text">{progress}%</div>
            </div>
          </div>
          <div className="card-back"> 
            <div className="detail-row deadline-row">
            <span className="detail-color">Deadline: </span>
            <span>{task.dueDate}</span>
            </div>
            <div className="detail-row description-row">
            <span className="detail-color">Description: </span>
            <span className="description-text">{task.description}</span>
            <span className="click">click for more details</span>
          </div>
          </div>
        </div>
        <div className="card-actions">
          <button onClick={() => handleEditClick(task)} className="card-buttons">
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${task.title}"?`)) {
                handleDeleteTask(task.id);
              }
            }}
            className="card-buttons"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
