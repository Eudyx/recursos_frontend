import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteFormUser from '../subdocuments/DeleteFormUser';
import CreateUserForm from '../subdocuments/CreateUserForm';
import Event from '../subdocuments/Event';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const [renderCounter, setRenderCounter] = useState(0);
    const [alertVt, setAlerVt] = useState(false);

    // showing an alert when a user is created
    const alertVisibility = () => {
        setAlerVt(true);
        setTimeout(() => {
            setAlerVt(false);
        }, 3000)
    }

    const getAllUsers = async () => {
      try {
        const result = await axios.get('/users');
        setUsers(result.data);
      } catch (err) {
        console.error(err);
      }
    }

    useEffect(() => {
        getAllUsers();
    }, [active, renderCounter])
    

  return (
    <>
    <CreateUserForm
        setRenderCounter={setRenderCounter}
        alertVisibility={alertVisibility}
    />
    <Event alertVt={alertVt} />
    <div className='d-flex justify-content-center pt-4'>
      <table className="table w-75">
        <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col"></th>
            </tr>
        </thead>
            <tbody>
                {
                    users.map(user => 
                        !user.roles?.Admin ?
                        <tr key={user._id}>
                            <td>{user.user}</td>
                            <td className='d-flex justify-content-end'>
                                <button className='btn btn-primary fw-bold ms-2' onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/source/${user.user}`);
                                }} >Crear recurso</button>
                                <button className='btn btn-success fw-bold ms-2' onClick={(e) => {
                                    e.preventDefault();
                                    setUser(user.user);
                                    setActive(true);
                                }} >Eliminar usuario</button>
                            </td>
                        </tr> : null
                    )
                }
            </tbody>
        </table>
        <DeleteFormUser user={user} active={active} setActive={setActive} />
    </div>
    </>
  )
}

export default UsersList
