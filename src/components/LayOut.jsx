import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const LayOut = () => {
  return (
    <>
        <header className='row'>
            <Navbar />
        </header>
        <div className='row justify-content-center align-itmes-center'>
            <Outlet />
        </div>
    </>
  )
}

export default LayOut
