import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';
import { Button, Card } from "react-bootstrap";
import TopQuizzes from './QuizzesDeck';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
    .create-quiz {
        width: 250px !important;
    }
`;

class Course extends Component {
    state = {
        course: null,
        quizData: [],
        topRatedQuizzes: []
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("http://localhost:9083/courses/get-courses/" + id).then(res => {
            this.setState({
                course: res.data[0]
            })
        })
        axios.get('http://localhost:9084/quizzes/get-course/' + id).then(res => {
            this.setState({
                quizData: res.data,
            }, () => {this.getTopRatedQuizzes()})
        }).catch(err => {
            console.log(err);
        })
    }

    getTopRatedQuizzes = () => {
        var obj = [...this.state.quizData];
        obj.sort((a,b) => b.rating - a.rating);
        this.setState({topRatedQuizzes: obj.slice(0,3)})
    }

    render () {
        const course = this.state.course ? (
            <div>
                <TopNavbar/>
                <div className='container-middle'> 
                    <h1 className="center header">{this.state.course.courseName}</h1>
                    <div style={{padding: '10px'}}> </div>
                    <Styles>
                    <Link to={"/CreateQuiz/" + this.state.course.courseId}>
                    <Button variant='light' className='create-quiz center'>Create a Quiz</Button>
                    </Link>
                    </Styles>
                </div>

                <div className='container'>
                    <h1 className='subtitle'> Top Rated Quizzes </h1>
                    <TopQuizzes data={this.state.topRatedQuizzes}/>

                    <div className="spacer"></div>
                    <h1 className='subtitle'> Course Quizzes </h1>
                    <Card className='rounded-corner'>
                        <QuizTable data={this.state.quizData}/>
                    </Card>
                </div>
            </div>
        ) : (
            <div> <TopNavbar/>
            <div className="container-center"> <Loading type={'balls'} color={'#235937'}/></div>
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