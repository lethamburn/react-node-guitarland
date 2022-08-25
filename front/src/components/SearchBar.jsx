import "./SearchBar.css"

const SearchBar = ({setFilterWord}) => {



  return <input type="text" id="search" className="searchbar" onChange={() => setFilterWord(search.value.toLowerCase())} placeholder="Search by name, brand or description"/>;
};

export default SearchBar;
