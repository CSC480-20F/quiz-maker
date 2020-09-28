import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../pexels-anna-shvets-3683107.jpg';

const TopNavbar = () => {

  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile()
  const name = profile.getName()
  // const imageUrl = profile.getImageUrl()

  return (
  <Navbar collapseOnSelect expand="lg" variant='light' className='tall'>
  <Navbar.Brand href="/">
      <img
        alt="logo"
        src= {logo}
        width="50"
        height="50"
        className="d-inline-block align-center"
      />{' '}
      QuizMaker
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
      <NavDropdown title={name} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={authInstance.signOut} href="/">Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
  )
}

export default TopNavbar;