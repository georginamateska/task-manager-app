import { useState, useEffect, useContext } from "react";
import { mockData } from "./data/mockData";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TaskDetail from "./components/TaskDetail";
import { TaskContext } from "./context/TaskContext";
import LoginPage from "./components/authentication/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); //default-bez filterling dodadeno
  const [sortOrder, setSortOrder] = useState("added");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const{
    tasks
  } = useContext(TaskContext);

  
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchItem),
  );

  const visibleTasks =
    statusFilter === "all"
      ? searchedTasks
      : searchedTasks.filter((task) => task.status === statusFilter);

  const sortedTasks = [...visibleTasks];

  if (sortOrder === "earliest") {
    sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOrder === "latest") {
    sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  function emptyStateMessage() {
    if (tasks.length === 0) {
      return "No tasks yet - add one to get started.";
    }
    if (sortedTasks.length === 0) {
      return "No tasks match your search or filter.";
    }
    return null;
  }

  const startIndex = (currentPage - 1) * tasksPerPage;
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const paginatedTasks = sortedTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );



  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const remainingTasks = totalTasks - completedTasks;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem, statusFilter]);

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
          <Route
          path="/register"
          element={<RegisterPage />}>
          </Route>
          <Route 
          path="/login"
          element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Dashboard
                sortedTasks={sortedTasks}
                paginatedTasks={paginatedTasks}
                emptyStateMessage={emptyStateMessage}
                darkMode={darkMode}
                onDarkMode={() => setDarkMode(!darkMode)}
                setSearchItem={setSearchItem}
                setStatusFilter={setStatusFilter}
                statusFilter={statusFilter}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                remainingTasks={remainingTasks}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                searchItem={searchItem}
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <TaskDetail
                darkMode={darkMode}
                onDarkMode={() => setDarkMode(!darkMode)}
                setSearchItem={setSearchItem}
                setStatusFilter={setStatusFilter}
                statusFilter={statusFilter}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                remainingTasks={remainingTasks}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
