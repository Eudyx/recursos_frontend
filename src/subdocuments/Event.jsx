import React from 'react'

const Event = ({ alertVt }) => {

    const styles = {
        visibility: alertVt ? 'visible' : 'hidden'
    }

  return (
    <div className='d-flex justify-content-center w-100' style={styles}>
        <h1 className='card bg-success text-white text-center w-25 p-2 h5'>
            Usuario Creado
        </h1>
    </div>
  )
}

export default Event
