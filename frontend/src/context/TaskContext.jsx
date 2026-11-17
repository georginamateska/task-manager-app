import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function TaskProvider({ children }) {

  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  
//vcituvanje zadaci
    useEffect(() => {
    if (!token) {
      setTasks([]);
      return;
    }

    fetch(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Load tasks error:", error));
  }, [token]);//run this whenever token changes


  function handleAddTask(newTask) {
    const payload = { ...newTask, due_date: newTask.dueDate };
    delete payload.dueDate;

    fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json", //sending json data
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
      body: JSON.stringify(payload), //konvertnuva newTask in json
    })
      .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
          console.log("Add task error:", data);
          return;
    }
    return data;
    })
      .then((savedTask) => {
          if (savedTask) {
              setTasks([...tasks, savedTask]);
          }
      });
    }

  function handleDeleteTask(id) {
  fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
  }).then(() => {
    setTasks(tasks.filter((task) => task.id !== id));
  });
}

function handleUpdateTask(updatedTask) {
  const payload = { ...updatedTask, due_date: updatedTask.dueDate };
  delete payload.dueDate;

  fetch(`${API_URL}/api/tasks/}${updatedTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((savedTask) => {
      setTasks(
        tasks.map((task) =>
          task.id === savedTask.id ? savedTask : task
        )
      );

      setEditingTask(null);
    });
}

function handleEditClick(task) {
  setEditingTask(task);
}

function handleCancelEdit() {
  setEditingTask(null);
}

  return (
    <TaskContext.Provider value={{ 
        tasks, 
        setTasks,
        editingTask,
        setEditingTask,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleEditClick,
        handleCancelEdit,
        }}
    >
      {children}
    </TaskContext.Provider>
  );
}
