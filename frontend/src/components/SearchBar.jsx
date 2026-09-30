import "./style/SearchBar.css";

function SearchBar({ searchItem, onSearchChange }) {
  function inputHandler(e) {
    onSearchChange(e.target.value.toLowerCase());
  }

  return (
  <input 
  className="search" 
  placeholder="Search task..." 
  onChange={inputHandler}
  value={searchItem}
  ></input>
)
}
export default SearchBar;
