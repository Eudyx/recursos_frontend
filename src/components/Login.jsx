import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [errMsg, setErrMsg] = useState('');
    const { auth, setAuth } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    })
    

    const handleSbmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('/login', {
                user: formData.user,
                password: formData.password
            });

            console.log(result);
            let data = {
                user: result.data.user.user,
                id: result.data.user._id,
                roles: result.data.user.roles
            }

            setAuth(data); // setting the user data to the context
            window.localStorage.setItem('user', JSON.stringify(data)); //setting the user data to the local storage

            // cleans the inputs states
            setFormData({
                user: '',
                password: ''
            });

            navigate('/');
        }
        catch(err) {
            if(!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if(err.response.status === 400) {
                setErrMsg('Usuario y Contraseña requeridos');
            } else if(err.response.status === 204) {
                setErrMsg('El usuario no existe');
            } else if(err.response.status === 401) {
                setErrMsg('Usuario o contraseña incorrecta');
            } else {
                setErrMsg('Fallo del servidor');
            }
        }

    }

    useEffect(() => {
        auth?.user ?
            navigate('/') : null
    }, [])
    

  return (
    <div className='col-12 col-sm-8 col-lg-4 mt-5'>
        <div className='card mb-5 px-2 py-1 bg-primary text-white'>
            <p>Loguearse con: <br/> <strong>Usuario:</strong> Eudys <strong>Contraseña:</strong> 1234</p>
            <p>Tiene permisos de administrador.</p>
        </div>
        <form className='form-control p-4' onSubmit={handleSbmit}>
            <h2>Log in</h2>

            { errMsg ? <h1 className='h6 text-danger'>{errMsg}</h1> : null }

            <div className="mb-3">
                <label htmlFor="user" className="form-label">Usuario</label>
                <input
                    type="text"
                    className="form-control"
                    id="user"
                    aria-describedby="emailHelp"
                    value={formData.user} 
                    onChange={e => 
                        setFormData({...formData, user: e.target.value})
                    }
                />
            </div>

            <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Usuario</label>
                <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    aria-describedby="emailHelp"
                    value={formData.password}
                    onChange={e => 
                    setFormData({...formData, password: e.target.value})
                    } 
                />
            </div>
            
            <button type="submit" className="btn btn-primary fw-bold">Enviar</button>
        </form>
    </div>
  )
}

export default Login
