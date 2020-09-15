import React from 'react'
import {Dropdown} from 'react-bootstrap'
import logo from '../pexels-anna-shvets-3683107.jpg'; 
import CreateQuiz from './CreateQuiz';
import Button from 'react-bootstrap/Button'
import { Sidenav } from 'rsuite';
// import MyCourses from './MyCourses';

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const name = profile.getName()
    //const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    return (
        <>
            <Sidenav>
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
            </Sidenav>

            <div className="container">
            <div className="Dashboard-header"> QuizMaker </div>
            <div className='subtitle'>Welcome back, {name}</div>
            <Button variant="warning" className='create-quiz'>Create Quiz Here</Button>
                <CreateQuiz/>
                <div>
                    {/* <MyCourses /> */}
                </div>
    
            </div>
        </>
    )
}

export default Dashboard;