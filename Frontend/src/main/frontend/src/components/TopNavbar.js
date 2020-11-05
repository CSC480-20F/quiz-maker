import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import logo from '../pexels-anna-shvets-3683107.jpg';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
// import DarkModeToggle from './DarkModeToggle';
// import DarkModeMain from './DarkModeMain';

import quizmakerlogo from '../assets/Final_Dark_Background.png'
import {UserContext} from '../context/UserContext';
import DarkModeApp from './DarkModeApp';

const Styles = styled.div`
  .navbar { 
    background-color: "black";
    border-bottom:1px solid "#235937"; 
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
  ${'' /* #toggle-dark-mode
  {
    background-color:white;
    color:#235937;
    
  } */}

  #edit-dark-mode-text {
    margin:100px;
  }
  
  }
`;

const TopNavbar = () => {

  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile()
  const name = profile.getName()
  const teacher = useContext(UserContext).isInstructor

  const view = teacher ? (
    <> <NavLink to="/RosterUpload" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Course Creation</NavLink> </>
  ):(
    <> </>
  )

  return (
      <>
      <Styles>
      <Navbar id="topnavbar" className = "nav-bar-style"  variant="dark" >
      <Navbar.Brand as={Link} to="/">
      <img className="login-quizmaker-logo" alt="QuizMaker Logo" src={quizmakerlogo} style={{maxWidth:'65%', paddingBottom:'20px', paddingLeft:'50px', paddingTop:'10px'}}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
      <NavLink exact to="/" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}> Home </NavLink>
      <NavLink to="/Courses" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Courses</NavLink>
      <NavLink to="/Quizzes" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Quizzes</NavLink>
      <NavLink to="/CreateQuiz" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Create</NavLink>
      {view}
      {/* <NavLink to="/RosterUpload" activeClassName="active" style={{ textDecoration: 'none' }}>Course Creation</NavLink> */}

      
     
      </Nav>
      
      <div style={{fontSize:'9px', margin:'25px'}}>
      <DarkModeApp id="edit-dark-mode-text"/> 
      {/* <DarkModeApp  id="edit-dark-mode-text"></DarkModeApp> */}
      </div>
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