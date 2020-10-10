import React from 'react'
import { Button } from "react-bootstrap";
import MyCourses from './MyCourses';
import RecentQuizzes from './RecentQuizzes';
// import Searchbar from './Searchbar';
import TopNavbar from './TopNavbar';

const Dashboard = () => {
    // const authInstance = window.gapi.auth2.getAuthInstance()
    // const user = authInstance.currentUser.get()
    // const profile = user.getBasicProfile()
    // const name = profile.getName()
    //const email = profile.getEmail()
    // const imageUrl = profile.getImageUrl()

    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Fall 2020 </div>
            {/* <div className='light-text'>Welcome back, {name}</div> */}

            {/* <Searchbar/> */}

            <div style={{padding: '10px'}}> </div>
            <Button variant="light" className='create-quiz'>Create a Quiz</Button>
                <div className='container'>
                    <h1 className='subtitle'> My Courses </h1>
                    <MyCourses />
                    <div className="spacer"></div>
                    <h1 className='subtitle'> My Recently Created Quizzes </h1>
                    <RecentQuizzes/>
                    <div style={{padding: '10px'}}></div>
                </div>
    
            </div>
        </div>
    )
}

export default Dashboard;