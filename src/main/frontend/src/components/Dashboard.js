import React from 'react'
import { Button } from "react-bootstrap";
import MyCourses from './MyCourses';
import Searchbar from './Searchbar';
import TopNavbar from './TopNavbar';

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const name = profile.getName()
    //const email = profile.getEmail()
    // const imageUrl = profile.getImageUrl()

    return (
        <>
            <div> <TopNavbar/></div>
            
            <div className="container-middle">
            <div className="header"> QuizMaker </div>
            <div className='light-text'>Welcome back, {name}</div>

            <Searchbar/>

            <div style={{padding: '10px'}}> </div>
            <Button variant="warning" className='create-quiz'>Create a Quiz</Button>
                <div className='container'>
                    <MyCourses />
                </div>
    
            </div>
        </>
    )
}

export default Dashboard;