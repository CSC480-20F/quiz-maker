import React from 'react'
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import MyTopRatedQuizzes from './MyTopRatedQuizzes';
import TopNavbar from './TopNavbar';
import styled from 'styled-components';
import MyCreatedQuizzes from './MyCreatedQuizzesTable';
import QuizzesTaken from './QuizzesTakenTable';

const Styles = styled.div`
    .nav-tabs {
        border-bottom: 1px solid #F2F2F2;
    }

    .nav-tabs .nav-link{
        font-size: 20px;
        color: #235937;
        background-color: #F2F2F2;
        border: 1px solid #F2F2F2;
        font-weight: bolder;
        opacity: 0.5;
    }

    .nav-item.nav-link.active{
        opacity: 1;
    }
`;

const Quizzes = () => {
    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Quizzes </div>
            <div style={{padding: '10px'}}> </div>
            <Button variant="light" className='create-quiz'>Create a Quiz</Button>

            <div style={{padding: '10px'}}> </div>
                <div className='container'>
                    <h1 className='subtitle'> My Top Rated Quizzes </h1>
                    <MyTopRatedQuizzes />

                    <div className="spacer"></div>
                    <Styles>
                    <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
                    <Tab eventKey="MyQuizzes" title="My created quizzes">
                        <Card className='rounded-corner'>
                            <MyCreatedQuizzes />
                        </Card>
                    </Tab>
                    <Tab eventKey="QuizHistory" title="Quizzes I took">
                        <Card className='rounded-corner'>
                            <QuizzesTaken />
                        </Card>
                    </Tab>
                    </Tabs>
                    </Styles>
                    <div style={{padding: '10px'}}> </div>
                </div>
    
            </div>
        </div>
    )
}

export default Quizzes;