import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  // function send back user to home page after 5 seconds 
setTimeout(() => {
  window.location.href="http://localhost:3000/"
}, 5000);
  
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>Sorry, we could not find the page you are looking for.</p>
      <NavLink to={"/"}>Visit Home</NavLink>
    </div>
  )
}

export default Error