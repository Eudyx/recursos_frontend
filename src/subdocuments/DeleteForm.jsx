/* eslint-disable */
import { useState } from "react"
import axios from "../api/axios";

const DeleteForm = ({ source, active, setActive }) => {

    const [msg, setMsg] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('/sourceDelete', {
                title: source.title,
                file: source.file,
                description: source.description,
                owner: source.owner,
                deleteDescription: msg
            });
            await axios.delete(`/sources/${source._id}`);
        } catch (err) {
            console.error(err);
        }
    }

    const styles = {
        display: active ? 'flex' : 'none'
    }

  return (
    <div className="delete-form-container position-fixed" style={styles}>
        <div className="col-5">
            <form className='form-control p-4' onSubmit={handleSubmit}>
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

export default DeleteForm
