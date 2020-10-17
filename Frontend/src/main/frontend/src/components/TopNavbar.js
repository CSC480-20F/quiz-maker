import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import logo from '../pexels-anna-shvets-3683107.jpg';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';


const Styles = styled.div`
  .navbar { 
    background-color: "black";
    border-bottom:1px solid white; 
  }

  a, .nav-link {
    color: white;
    padding: 15px;
    font-size: 16px;
    font-weight: light;
    &:hover { color: white; }
  }

  a:hover {
    color: #FE9C02;
  }

  .navbar-brand {
    font-size: 1.4em;
    color: white;
    &:hover { color: white; }
  }

  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }

  #nav-drop-down-little-box{
  background-color:white;
  color:#235937;
}
  #toggle-dark-mode
  {
    background-color:white;
    color:#235937;
    
  }
  
  }
`;

const TopNavbar = () => {

  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile()
  const name = profile.getName()
  // const imageUrl = profile.getImageUrl()


  return (
      <>
      <Styles>
      <Navbar className = "nav-bar-style"  variant="dark" >
      <Navbar.Brand as={Link} to="/">QuizMaker</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
      <NavLink exact to="/" activeClassName="active" style={{ textDecoration: 'none' }}> Home </NavLink>
      <NavLink to="/Courses" activeClassName="active" style={{ textDecoration: 'none' }}>Courses</NavLink>
      <NavLink to="/Quizzes" activeClassName="active" style={{ textDecoration: 'none' }}>Quizzes</NavLink>
      <NavLink to="/CreateQuiz" activeClassName="active" style={{ textDecoration: 'none' }}>Create</NavLink>
      {/* <NavLink to="/CreateQuiz_v2" activeClassName="active" style={{ textDecoration: 'none' }}>Createv2</NavLink> */}
      <NavLink to="/RosterUpload" activeClassName="active" style={{ textDecoration: 'none' }}>Upload Roster</NavLink>
      <NavLink to="/TakingQuiz" activeClassName="active" style={{ textDecoration: 'none' }}>Take Quiz</NavLink>

      
      {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="dark">Search</Button>
      </Form> */}
      </Nav>
      <img src={logo} alt="SUNY Oswego Logo" style={{width:98, height: 36, marginTop: -8}} />
      <NavDropdown className="justify-content-end" title={name} id="collasible-nav-dropdown">
      <NavDropdown.Item id="nav-drop-down-little-box" onClick={authInstance.signOut} href="/">Sign Out
      {/* <NavDropdown.Item id="toggle-dark-mode" onClick={"function here"} href="/"> Toggle Dark Mode */}

      {/* </NavDropdown.Item> */}
      </NavDropdown.Item>
      </NavDropdown>

      </Navbar>
      </Styles>
      </>
  )
}






  export default TopNavbar;