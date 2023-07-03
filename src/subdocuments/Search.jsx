import { useRef } from "react";

const Search = ({ sources, setFilteredSource }) => {

    const serachRef = useRef();

    const handleFilter = (e) => {
        e.preventDefault();
        console.log(sources)
        let searchText = serachRef.current.value.trim().toLowerCase(); //getting input value
        // Data filtering
        setFilteredSource(sources.filter(source => source.title.trim().toLowerCase().includes(searchText) || source.owner.trim().toLowerCase().includes(searchText)));
    }

  return (
      <form onSubmit={handleFilter} className="d-flex justify-content-center col-12 col-lg-6 mb-3">
          <button className="btn btn-outline-success" type="submit">Search</button>
          <input ref={serachRef} className="form-control ms-2" type="search" placeholder="Search" aria-label="Search" />
      </form>
  )
}

export default Search
