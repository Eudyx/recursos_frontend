import { Link, useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser";

const Navbar = () => {

  const { auth } = useUser();

  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        {
          //shows the user name
          auth?.user ?
          <div>
            <p className="fw-bold h4">{auth.user}</p>
          </div>
          : null
        }
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to='/' className="nav-link" aria-current="page">Admin</Link>
        </li>
        <li className="nav-item">
          <Link to='/userList' className="nav-link" href="#">User</Link>
        </li>
      </ul>
      </div>
    </div>
</nav>
  )
}

export default Navbar
