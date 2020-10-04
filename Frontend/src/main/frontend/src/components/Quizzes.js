import React from 'react'
import { Button, Tabs, Tab } from "react-bootstrap";
import RecentQuizzes from './RecentQuizzes';
import TopNavbar from './TopNavbar';

const Quizzes = () => {
    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Quizzes </div>
            <div style={{padding: '10px'}}> </div>
            <Button variant="warning" className='create-quiz'>Create a Quiz</Button>

            <div style={{padding: '10px'}}> </div>
                <div className='container'>
                    <h1 className='subtitle'> Most Recent </h1>
                    <RecentQuizzes />

                    <div className="spacer"></div>
                    <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
                    <Tab eventKey="MyQuizzes" title="My Quizzes">
                        TODO: Make a MyQuizzesTable Component to put here
                        <h1> MY QUIZZES </h1>
                    </Tab>
                    <Tab eventKey="QuizHistory" title="Quiz History">
                        TODO: Make a QuizHistoryTable Component to put here
                        <h1> QUIZ HISTORY </h1>
                    </Tab>
                    </Tabs>
                    <div style={{padding: '10px'}}> </div>
                </div>
    
            </div>
        </div>
    )
}

export default Quizzes;