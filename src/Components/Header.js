import React from 'react'
import Logo from '../assets/logo.png'
import {Link} from 'react-router-dom'

function Header(props) {
  const links = props.links ;
  
  return (
    <div className="header">
      <section>
        <img src={Logo} alt="logo"></img>
        <p>Dayananda Sagar <br></br> <span style={{fontSize: "16px"}}>College Of Engineering</span></p>
      </section>
      <nav>
      <Link to={links[0].href}>{links[0].name}</Link>
      <Link to={links[1].href}>{links[1].name}</Link>
      </nav>
    </div>
  )
}

export default Header