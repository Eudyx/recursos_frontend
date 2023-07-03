import axios from '../api/axios';
import { useRef, useState } from "react";
import { useParams } from 'react-router-dom';


const FileUpload = () => {
    
    const fileRef = useRef();

    const { name } = useParams();

    const [errMsg, setErrMsg] = useState('');
    const [source, setSource] = useState({
        title: '',
        file: '',
        description: ''
    });

    const handleSbmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const user = name;
        if(source.file !== null && source.file !== '' && source.title !== '' && source.description !== '') {
            try {
                // uploading a flie
                formData.append('file', source.file);
                const response = await axios.post('/sources/uploads', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
    
                const fileName = response.data.filen; //gets the file name in the server
    
                // creatiing an item
                const result = await axios.post('/sources', {
                    title: source.title,
                    file: fileName,
                    description: source.description,
                    owner: user
                })
    
                // cleaning
                setSource({
                    title: '',
                    description: ''
                });
                setErrMsg('');
                fileRef.current.value = null;
    
            } catch (err) {
                console.error(err);
            }
        } else {
            setErrMsg('Debe llenar todos los campos');
        }
    }

  return (
    <div className='col-12 col-lg-4 mt-5'>
        <form className='form-control p-4' onSubmit={handleSbmit}>
            {errMsg ? <h6 className='text-danger'>{errMsg}</h6> : null}
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Seleccione una archivo</label>
                <input type="file" name="file" className="form-control" id="exampleInputPassword1" ref={fileRef} onChange={(e) => setSource({...source, file: e.target.files[0]})} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nombre de recurso</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={source.title} onChange={e => setSource({...source, title: e.target.value})} />
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={source.description} onChange={(e) => setSource({...source, description: e.target.value})}></textarea>
                <label htmlFor="floatingTextarea">Descripción</label>
            </div>
            <button type="submit" className="btn btn-primary col-12 fw-bold">Enviar</button>
        </form>
    </div>
  )
}

export default FileUpload
