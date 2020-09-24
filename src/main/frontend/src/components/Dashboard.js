import React from 'react'
// import {Dropdown} from 'react-bootstrap'
// import logo from '../pexels-anna-shvets-3683107.jpg'; 
// import CreateQuiz from './CreateQuiz';
import { Button } from "react-bootstrap";
import MyCourses from './MyCourses';
import Searchbar from './Searchbar';
// import QuizTable from './QuizTable';
import Sidebar from './SideNavbar';

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const name = profile.getName()
    //const email = profile.getEmail()
    // const imageUrl = profile.getImageUrl()

    return (
        <>
            {/* <nav>
            <img className="home-logo" src ={logo} alt ="=main page"/>
                <div>QuizMaker</div>
                
                
                <img className="push" src={imageUrl} alt="Profile"/>
                <Dropdown>
                    <Dropdown.Toggle as="a">
                        {name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={authInstance.signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav> */}
            <div> <Sidebar/></div>
            {/* <Sidebar/> */}
            
            <div className="container">
            <div className="header"> QuizMaker </div>
            <div className='light-text'>Welcome back, {name}</div>

            <Searchbar/>

            <div style={{padding: '10px'}}> </div>
            <Button variant="warning" className='create-quiz'>Create a Quiz</Button>
                <div className='content' style={{padding: '10px'}}>
                    <MyCourses />
                </div>
                {/* <CreateQuiz/> */}

                <div style={{padding: '10px'}}>
                    {/* <QuizTable /> */}
                </div>
    
            </div>
        </>
    )
}

export default Dashboard;