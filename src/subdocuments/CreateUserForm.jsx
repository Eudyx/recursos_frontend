import React, { useState } from 'react'
import axios from '../api/axios'

const CreateUserForm = ({ setRenderCounter, alertVisibility }) => {

    const [userCreated, setUserCreated] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/users', {
                user: userCreated
            });

            setUserCreated('');
            setRenderCounter(prev => prev + 1);
            alertVisibility();
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className="d-flex justify-content-center col-12 col-lg-8 rounded-4 p-4 mt-5">
        <button onClick={handleSubmit} className="btn btn-outline-success w-25" type="submit">Crear Usuario</button>
        <input className="form-control ms-2" value={userCreated} onChange={(e) => setUserCreated(e.target.value)} type="text" placeholder="ej: Juan" aria-label="Search" />
    </div>
  )
}

export default CreateUserForm
