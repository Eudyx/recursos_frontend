import { usePages } from '../hooks/usePages';

const Pagination = ({ sources, numberOfPages, currentPage, setCurrentPage, numberOfSources }) => {

  const setPages = usePages();

  const onChangePage = (e) => {
    e.preventDefault();
    setCurrentPage(Number(e.target.innerText));
  }

  const prePage = (e) => {
    e.preventDefault();
    if(currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const nextPage = (e) => {
    e.preventDefault();
    if(currentPage < numberOfPages) setCurrentPage(currentPage + 1);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination" style={{ cursor: 'pointer' }}>
          <li className="page-item" onClick={prePage}><a className="page-link text-secondary" >Previous</a></li>
          {setPages(sources, numberOfSources).map(page => <li key={page} className="page-item" onClick={onChangePage}><a className="page-link text-secondary fw-semibold">{page}</a></li>)}
          <li className="page-item" onClick={nextPage}><a className="page-link text-secondary" >Next</a></li>
      </ul>
    </nav>
  )
}

export default Pagination