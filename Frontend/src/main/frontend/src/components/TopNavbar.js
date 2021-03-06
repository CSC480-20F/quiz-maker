// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import quizmakerlogo from '../assets/Final_Dark_Background.png'
import {UserContext} from '../context/UserContext';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';

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

  #nav-drop-down-little-box-darkmode{
  color:#235937;
  }

  #edit-dark-mode-text-2{
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

  const view = teacher === true ? (
    <> <NavLink to="/RosterUpload" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Course Creation</NavLink> </>
  ):(
    <> </>
  )

  function DarkModeApp() {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
      };

    return (
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </>
      </ThemeProvider>
    );
  }

  return (
      <>
      <Styles>
      <Navbar id="topnavbar" className = "nav-bar-style"  variant="dark" >
      <Navbar.Brand title="Home" as={Link} to="/">
      
      <img className="login-quizmaker-logo" alt="QuizMaker Logo" src={quizmakerlogo} style={{maxWidth:'65%', paddingBottom:'20px', paddingLeft:'50px', paddingTop:'10px'}}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
        <NavLink title="Home" exact to="/" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}> Home </NavLink>
        <NavLink title="View Courses" to="/Courses" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Courses</NavLink>
        <NavLink title="View Quizzes" to="/Quizzes" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Quizzes</NavLink>
        <NavLink title="Create a Quiz" to="/CreateQuiz" activeClassName="active" style={{ textDecoration: 'none', paddingTop:'20px' }}>Create</NavLink>
        {view}
      </Nav>
      
      <div title="Switch Theme" id="edit-dark-mode-text" style={{fontSize:'9px', margin:'25px', color:'red  '}}>
      <DarkModeApp id="edit-dark-mode-text-2" /> 
      </div>
      <img src={logo} alt="SUNY Oswego Logo" style={{width:98, height: 36, marginTop: -8}} />
      <NavDropdown className="justify-content-end" title={name} id="collasible-nav-dropdown">
        <NavDropdown.Item id="nav-drop-down-little-box" as={Link} to="/About">About </NavDropdown.Item>
        <NavDropdown.Item title="" id="nav-drop-down-little-box" onClick={authInstance.signOut} href="/">Sign Out </NavDropdown.Item>
      </NavDropdown>

      </Navbar>
      </Styles>
      </>
  )
}






  export default TopNavbar;