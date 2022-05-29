import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
  return (
    <div className='without__data'>
      <h1>Not Found</h1>
      <Link to="/">На главную</Link>
    </div>
  )
}

export default NotFound