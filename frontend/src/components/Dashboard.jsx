import TaskList from "./TaskList";
import AddTask from "./AddTask";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard({
  sortedTasks,
  paginatedTasks,
  emptyStateMessage,
  darkMode,
  onDarkMode,
  setSearchItem,
  setStatusFilter,
  statusFilter,
  setSortOrder,
  sortOrder,
  totalTasks,
  completedTasks,
  remainingTasks,
  currentPage,
  totalPages,
  setCurrentPage,
  searchItem,
}) {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  return (
    <>
      <h1 className="intro">Your Tasks: </h1>

      <div className="dashboard">
        <div className="task-list">
          {sortedTasks.length === 0 ? (
            <p className="empty-state">{emptyStateMessage()}</p>
          ) : (
            <>
              <TaskList tasks={paginatedTasks} />
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>

      
        <div className="side-bar">
          <div className="search-bar">
            <SearchBar onSearchChange={setSearchItem} searchItem={searchItem}/>
          </div>
          <div className="add-task">
            <AddTask
              darkMode={darkMode}
              onDarkMode={onDarkMode}
            />
            <button onClick={async () => {
              await logout();
              navigate("/login");
            }}>
              Logout
            </button>
                </div>

          <div className="filter-bar">
            <FilterBar
              onFilterChange={setStatusFilter}
              statusFilter={statusFilter}
              onSortChange={setSortOrder}
              sortOrder={sortOrder}
              
            />
            <div className="statistics">
              <p>Total: {totalTasks}</p>
              <p>Completed Tasks: {completedTasks} </p>
              <p>Remaining Tasks: {remainingTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;