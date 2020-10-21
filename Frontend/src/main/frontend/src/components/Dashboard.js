import React from 'react'
import { Button } from "react-bootstrap";
import MyCourses from './MyCourses';
import RecentQuizzes from './RecentQuizzes';
import TopNavbar from './TopNavbar';
import {Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Fall 2020 </div>

            <div style={{padding: '10px'}}> </div>
            <Button variant="light" className='create-quiz' as={Link} to="/CreateQuiz">Create a Quiz</Button>
                <div className='container'>
                    <h1 className='subtitle'> My Courses </h1>
                    <MyCourses limit="3"/>
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