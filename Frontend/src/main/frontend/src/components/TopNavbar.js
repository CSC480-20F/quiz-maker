import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl,Button, Col, InputGroup } from 'react-bootstrap';
import logo from '../pexels-anna-shvets-3683107.jpg';
import styled from 'styled-components';


const Styles = styled.div`
  .navbar { background-color: white; } //background
  a, .navbar-nav, .navbar-light .nav-link {
    color: black;
    &:hover { color: black; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: black;
    &:hover { color: black; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
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
      <Navbar className = "nav-bar-style"  variant="light" >
      <Navbar.Brand href="/">QuizMaker</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mx-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Courses">Courses</Nav.Link>
      <Nav.Link href="/Quizzes">Quizzes</Nav.Link>
      <Nav.Link href="/CreateQuiz">Create Quiz</Nav.Link>
      
      {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="dark">Search</Button>
      </Form> */}
      </Nav>
      <NavDropdown className="justify-content-end" title={name} id="collasible-nav-dropdown">
      <NavDropdown.Item onClick={authInstance.signOut} href="/">Sign Out
      </NavDropdown.Item>
      </NavDropdown>

      </Navbar>
      </Styles>
      </>
  )
}






  export default TopNavbar;