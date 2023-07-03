import { Outlet, Navigate, useLocation } from "react-router-dom"
import useUser from "../hooks/useUser"

const RequireAuth = () => {

    const { auth } = useUser();
    const location = useLocation();

  return (
    auth?.user ?
        <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
