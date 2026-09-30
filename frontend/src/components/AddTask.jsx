import { useState, useEffect } from "react";
import "./style/AddTask.css";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function AddTask({onDarkMode, darkMode}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const {
  handleAddTask,
  handleUpdateTask,
  handleCancelEdit,
  editingTask,
  } = useContext(TaskContext);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setDueDate(editingTask.dueDate);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    const error = validateSubmit();
    if (error) {
      setError(error);
      return;
    }
    setError(""); //clears old error

    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title,
        description,
        dueDate,
        status,
        priority,
      };
      handleUpdateTask(updatedTask);
    } else {
      const newTask = {
        id: Date.now(), //generates IDs
        title,
        description,
        dueDate,
        status,
        priority,
      };
      handleAddTask(newTask);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("todo");
    setPriority("");
  }

  function validateSubmit() {
    if (title === "") return "Title is required!"
    if (dueDate === "") return "Due date is required!";
    if (priority === "") return "Priority is required!";
    return null;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="addTask">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Add Title: "
          name="title"
        /><br></br>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description: "
          name="description"
          rows={7}
        /><br></br>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          name="date"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select><br></br>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          name="priority"
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select><br></br>
        {error && <p className="error">{error}</p>}

        <div className="submit-row">
        <button type="submit">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" onClick={() =>{
            resetForm();
            handleCancelEdit();
            setError("");
            setStatus("todo");
          }}>
            Cancel
          </button>
        )}
        <div className="theme-toggle">
              <input 
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={onDarkMode}>
              </input>
        </div>
        </div>
      </form>
    </>
  );
}
export default AddTask;
