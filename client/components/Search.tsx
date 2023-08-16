import "../styles/HeaderContent.scss";
const Search = () => {
  return (
    <div className="input-search">
      <form>
        <input type="search" placeholder="Search." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;