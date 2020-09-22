import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import logo from '../pexels-anna-shvets-3683107.jpg'; 
import '../styles/SideNavbar.css';


const SideNavbar = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    // const user = authInstance.currentUser.get()
    // const profile = user.getBasicProfile()
    // const name = profile.getName()
    //const email = profile.getEmail()
    // const imageUrl = profile.getImageUrl()

    return (
      <div class="sidebar">
        <img className="home-logo" src ={logo} alt ="=main page"/>
        <Link to='/' className='regular-link'> Dashboard </Link>
        <Nav.Link onClick={authInstance.signOut} href="/"> Sign Out </Nav.Link>
    </div>
        // <nav>
        //     <img className="home-logo" src ={logo} alt ="=main page"/>
        //         <NavLink className="regular-link" to="/">QuizMaker</NavLink>
                
        //         <img className="push" src={imageUrl} alt="Profile"/>
        //         <Dropdown>
        //             <Dropdown.Toggle as="a">
        //                 {name}
        //             </Dropdown.Toggle>
        //             <Dropdown.Menu>
        //                 <Dropdown.Item onClick={authInstance.signOut}>Sign out</Dropdown.Item>
        //             </Dropdown.Menu>
        //         </Dropdown>
        // </nav>
    )
}

export default withRouter(SideNavbar)