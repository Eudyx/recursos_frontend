import { useEffect, useState } from "react";
import axios from "../api/axios"
import DeleteForm from "../subdocuments/DeleteForm";
import Pagination from "./Pagination";
import Search from "../subdocuments/Search";

const Admin = () => {
  
    const [sources, setSources] = useState([]);
    const [filterdSource, setFilteredSource] = useState({});
    const [source, setSource] = useState({});
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sourcesPerPg, setSourcesPerPg] = useState([])
    const [numberOfSources, setNumberOfSources] = useState(10);

    // gest the item by pages
    const splitSources = (ns) => {
        let fragments = [];
        let start = 0;
        let end = 0;
        let pages = Math.ceil(sources.length / ns);

        for (let i = 0; i < pages; i++) {
            end = start + ns;
            fragments[i] = filterdSource == {} ? sources.slice(start, end) : filterdSource.slice(start, end);
            start += ns;
        }

        setSourcesPerPg(fragments);
    }

    // gets all items
    const getAllSources = async () => {
        const response = await axios.get('/sources');
        setSources(response.data);
    }

    // shows the form to delete
    const handleDelete = (res) => {
        setActive(true);
        setSource(res);
    }

    
    useEffect(() => {
        getAllSources();
    }, []);

    useEffect(() => {
        setFilteredSource(sources)
    }, [sources]);

    useEffect(() => {
        splitSources(numberOfSources);
    }, [sources, numberOfSources, filterdSource]);

    return (
    <section className="d-flex flex-column card-container 100-hv mt-5" >
        <div className="row d-flex justify-content-center col-12 mb-3">
            <Search sources={sources} setFilteredSource={setFilteredSource} />
            <select
                className="form-select w-25 mb-3"
                aria-label="Default select example"
                value={numberOfSources}
                onChange={(e) => setNumberOfSources(e.target.value)}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
        <div>
            { sourcesPerPg?.length && sourcesPerPg !== undefined ? sourcesPerPg[currentPage - 1].map(res => 
                <div className="row d-flex justify-content-start p-3 col-12 col-sm-12 col-md-11 col-md-9 card-op mb-3 mx-auto" key={res._id}>
                    <div className="d-flex align-items-center col-4 col-md-4 col-lg-3 col-xl-5 mb-3 p-2 rounded-3" style={{ backgroundColor: 'rgb(214, 214, 214)' }}>
                        <img className="w-100" src={`http://localhost:3000/${res.file}`} />
                    </div>
                    <div className="col-8 col-md-8 col-lg-9 col-xl-7 mb-3 info-container d-flex flex-column justify-content-between">
                        <div>
                            <h1 className="fw-bold">{res.title}</h1>
                            <h4>Descrición:</h4>
                            <p>{res.description}</p>
                            <label className="fw-bold float-start col-12 mb-3">Dueño: <span className="fw-normal">{res.owner}</span></label>
                        </div>
                        <div>
                            <button className="btn btn-success fw-bold d-inline-block float-start col-12 col-lg-2" onClick={(e) => {
                                e.preventDefault();
                                handleDelete(res);
                            }} >Delete</button>
                        </div>
                    </div>
                </div>) 
                : null }

                <div className="d-flex justify-content-center mt-4">
                    <Pagination sources={sources} numberOfPages={sourcesPerPg.length} currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfSources={numberOfSources} />
                </div>

                <DeleteForm source={source} active={active}  setActive={setActive} />
        </div>
    </section>
  )
}

export default Admin
