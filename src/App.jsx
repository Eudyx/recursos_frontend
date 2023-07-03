import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './components/FileUpload'
import Login from './components/Login';
import LayOut from './components/LayOut';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import UsersList from './components/UsersList';
import RequireAuth from './components/RequireAuth';
import useUser from './hooks/useUser';
import { useEffect } from 'react';
// import NotFound from './components/NotFound';

function App() {

  const { setAuth } = useUser();

  useEffect(() => {
    setAuth(JSON.parse(window.localStorage.getItem('user')));
  }, [])

  return (
    <main className='container-fluid vh-100'>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="login" element={<Login />} />

          <Route element={<RequireAuth  />}>
            <Route path="/" element={<Admin />} />
            <Route path="userList" element={<UsersList />} />
            <Route path="source/:name" element={<FileUpload />} />
          </Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
