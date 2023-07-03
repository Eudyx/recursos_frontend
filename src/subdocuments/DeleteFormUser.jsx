/* eslint-disable */
import { useState } from 'react'
import axios from '../api/axios';

const DeleteFormUser = ({ user, active, setActive }) => {

    const [msg, setMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(user)

        try {
            await axios.post('/userDelete', {
                user,
                deleteDescription: msg
            });
            await axios.delete(`/users/${user}`);

            setErrMsg('');
            setActive(false);
        } catch (err) {
            console.error(err);
            if(err.response?.status === 400) {
                setErrMsg('Es necesario una descripcion')
            }
        }
    }

    const styles = {
        display: active ? 'flex' : 'none'
    }

  return (
    <div className="delete-form-container position-fixed" style={styles}>
        <div className="col-5">
            <form className='form-control p-4' onSubmit={handleSubmit}>
            { errMsg ? <h5 className='text-danger'>{errMsg}</h5> : null}
            <h1>Eliminar</h1>
            <br />
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => setMsg(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea">Descripción</label>
                </div>
                <button type="submit" className="btn btn-danger fw-bold" >
                    Borrar
                </button>
                <button className="btn btn-success fw-bold mx-3" onClick={(e) => {
                    e.preventDefault();
                    setActive(false);
                }} >
                    Cancelar
                </button>
            </form>
        </div>
    </div>
  )
}

export default DeleteFormUser
