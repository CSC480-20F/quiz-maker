import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import logo from '../pexels-anna-shvets-3683107.jpg';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import logo from './logo.png';


const Styles = styled.div`
  .navbar { background-color: "black";
   border-bottom:1px solid white; }
  a, .nav-link {
    color: white;
    padding: 15px;
    &:hover { color: white; }
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
      <Nav className="mx-auto">
      <NavLink exact to="/" activeClassName="active"> Home </NavLink>
      <NavLink to="/Courses" activeClassName="active">Courses</NavLink>
      <NavLink to="/Quizzes" activeClassName="active">Quizzes</NavLink>
      <NavLink to="/CreateQuiz" activeClassName="active">Create</NavLink>
      <NavLink to="/CreateQuiz_v2" activeClassName="active">Createv2</NavLink>
      <NavLink to="/CreateQuizForm" activeClassName="active">CreateForm</NavLink>
      
      {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="dark">Search</Button>
      </Form> */}
      </Nav>
      <img src={logo} style={{width:100, height: 40, marginTop: -8}} />
      <NavDropdown className="justify-content-end" title={name} id="collasible-nav-dropdown">
      <NavDropdown.Item id="nav-drop-down-little-box" onClick={authInstance.signOut} href="/">Sign Out
      </NavDropdown.Item>
      </NavDropdown>

      </Navbar>
      </Styles>
      </>
  )
}






  export default TopNavbar;