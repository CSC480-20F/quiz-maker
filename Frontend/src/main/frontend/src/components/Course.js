import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';
import InstructorQuizTable from './InstructorQuizTable';
import { Button, Card, CardGroup } from "react-bootstrap";
import TopQuizzes from './QuizzesDeck';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import studentPic from '../assets/student.png';
import databasePic from '../assets/database.png';
import topicsPic from '../assets/topics.png';

const Styles = styled.div`
    .create-quiz {
        width: 250px !important;
    }

    .icon {
        max-height: 40px;
        margin-bottom: 20px;
        margin-top: 15px;
    }

    .manage {
        font-family: Roboto;
        min-width: 30%;
        color: white;
        border-radius: 20px;
        font-size: 20px;
        font-weight: 500;
        background-color: #8F0047;
    }

    .professor-panel-card {
        padding: 20px;
        align-items: center;
    }
`;

class Course extends Component {
    state = {
        course: null,
        quizData: [],
        topRatedQuizzes: [],
        isInstructor: false
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("http://localhost:9083/courses/get-courses/" + id).then(res => {
            this.setState({
                course: res.data[0]
            }, () => this.checkIfInstructor())
        })
        axios.get('http://localhost:9084/quizzes/get-course/' + id).then(res => {
            this.setState({
                quizData: res.data,
            }, () => {this.getTopRatedQuizzes()})
        }).catch(err => {
            console.log(err);
        })
    }

    checkIfInstructor = () => {
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
        if (this.state.course.teacher === email) {
            this.setState({isInstructor: true})
        }
    }

    getTopRatedQuizzes = () => {
        var obj = [...this.state.quizData];
        obj.sort((a,b) => b.rating - a.rating);
        this.setState({topRatedQuizzes: obj.slice(0,3)})
    }

    render () {
        const professorPanel = this.state.isInstructor ? (
            <>
            <div className="container">
                <h1 className="subtitle">Professor Panel</h1>
                <CardGroup className="professor-panel rounded-corner">
                    {/* <Card className="professor-panel-card rounded-corner">
                        <img src={databasePic} className="icon" alt="Database of Quizzes" />
                        <Button variant="light" className="manage"> Quiz Database </Button>
                    </Card> */}
                    <Card className="professor-panel-card rounded-corner">
                        <img src={studentPic} className="icon" alt="Database of Quizzes" />
                        <Button variant="light" className="manage">Manage Students </Button>
                    </Card>
                    <Card className="professor-panel-card rounded-corner">
                        <img src={topicsPic} className="icon" alt="Database of Quizzes" />
                        <Button variant="light" className="manage">Manage Topics </Button>
                    </Card>
                </CardGroup>
            </div>
            <div className="spacer"></div>
            </>
        ):(
            <div style={{padding: '10px'}}> </div>
        )

        const quiztable = this.state.isInstructor ? (
            <Card className='rounded-corner'>
                <InstructorQuizTable data={this.state.quizData}/>
            </Card>
        ):(
            <Card className='rounded-corner'>
                <QuizTable data={this.state.quizData}/>
            </Card>
        )

        const course = this.state.course ? (
            <div>
                <TopNavbar/>
                <Styles>
                <div className='container-middle'> 
                    <h1 className="center header">{this.state.course.courseName}</h1>
                    <div style={{padding: '10px'}}> </div>
                    <Link to={"/CreateQuiz/" + this.state.course._id.$oid}>
                    <Button variant='light' className='create-quiz center'>Create a Quiz</Button>
                    </Link>
                </div>

                {professorPanel}

                <div className='container'>
                    <h1 className='subtitle'> Top Rated Quizzes </h1>
                    <TopQuizzes data={this.state.topRatedQuizzes}/>

                    <div className="spacer"></div>
                    <h1 className='subtitle'> Course Quizzes </h1>
                    {quiztable}
                </div>
                </Styles>
            </div>
        ) : (
            <div> <TopNavbar/>
            <div className="container-center"> <Loading type={'spin'} color={'#235937'}/></div>
            </div>
        )
        return(
            <div>
                {course}
                <h1 className='header'> {this.state.textID} </h1>
            </div>
        )
    }
}

export default Course;