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
import topicsPic from '../assets/topics.png';
import ManageTopics from './ManageTopics';
import ManageStudents from './ManageStudents';

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

    .back {
        min-width: fit-content; 
        max-width: fit-content;
    }

    .professor-panel-card {
        padding: 20px;
        align-items: center;
    }
`;

class Course extends Component {
    state = {
        course: null,
        // course: {"topics": ["Bullshit", "Hello"], "courseName": "Bullshit", "_id":{"$oid": 213123123}},
        quizData: [],
        topRatedQuizzes: [],
        isInstructor: false,
        // isInstructor: true,
        manageTopics: false,
        manageStudents: false
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("http://pi.cs.oswego.edu:9083/courses/get-courses/" + id).then(res => {
            this.setState({
                course: res.data[0]
            }, () => this.checkIfInstructor())
        })
        axios.get('http://pi.cs.oswego.edu:9084/quizzes/get-course/' + id).then(res => {
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

    manageTopics = () => {
        this.setState({manageTopics: !this.state.manageTopics})
    }

    manageStudents = () => {
        this.setState({manageStudents: !this.state.manageStudents})
    }

    render () {
        const professorPanel = this.state.isInstructor ? (
            this.state.manageTopics ? (
                <div className="container">
                <Card className="manage-panel">
                <ManageTopics courseID={this.props.match.params.course_id}/>
                <div className="container"><Button id="dark-mode-button" variant="light" className="manage back" onClick={() => this.manageTopics()}> Back to Panel </Button></div>
                </Card>
                </div>
            ):(
                this.state.manageStudents ? (
                    <div className="container">
                    <Card className="manage-panel">
                    <ManageStudents courseID={this.props.match.params.course_id}/>
                    <div className="container"><Button id="dark-mode-button" variant="light" className="manage back" onClick={() => this.manageStudents()}> Back to Panel </Button></div>
                    </Card>
                    </div>
                ):(
                    <>
                    <div className="container">
                        <h1 className="subtitle">Professor Panel</h1>
                        <CardGroup className="rounded-corner">
                            <Card className="professor-panel-card rounded-corner">
                                <img src={studentPic} className="icon" alt="Database of Quizzes" />
                                <Button id="dark-mode-button" variant="light" className="manage" onClick={() => this.manageStudents()}>Manage Students </Button>
                            </Card>
                            <Card className="professor-panel-card rounded-corner">
                                <img src={topicsPic} className="icon" alt="Database of Quizzes" />
                                <Button id="dark-mode-button" variant="light" className="manage" onClick={() => this.manageTopics()}>Manage Topics </Button>
                            </Card>
                        </CardGroup>
                    </div>
                    <div className="spacer"></div>
                    </>
                )
            )
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
                    <Button id="dark-mode-button" variant='light' className='create-quiz center'>Create a Quiz</Button>
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