import React from 'react'
import Header from './Header'
import Loader from '../components/Loader'

function Layout(props) {
  return (
    <div>
      {props.loading && (<Loader />)}
        <Header />
        {props.loading && (<Loader />)}
        <div className="content">
            {props.children}
        </div>
    </div>
  )
}

export default Layout