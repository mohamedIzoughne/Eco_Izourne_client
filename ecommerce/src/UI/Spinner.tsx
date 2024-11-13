import React from 'react'

const Spinner = ({className}) => {
  return (
    <div className={`three-body ${className}`}>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
    </div>
  )
}

export default Spinner
