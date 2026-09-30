import "./style/FilterBar.css"

function FilterBar({ onFilterChange, statusFilter, onSortChange, sortOrder }) {

  return (
    <>
    <label htmlFor="status-filter">Filter By: </label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) =>
          onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="todo">To-Do</option>
        <option value="in-progress">In-Progress</option>
        <option value="done">Done</option>
      </select>

      <label htmlFor="sort-order">Sort By: </label>
      <select id="sort-order" value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        <option value="added">As Added</option>
        <option value="earliest">Earliest Due Date</option>
        <option value="latest">Latest Due Date</option>
      </select>
    </>
  );
}
export default FilterBar;
