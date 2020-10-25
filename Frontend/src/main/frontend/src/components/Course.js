import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';
import { Button, Card } from "react-bootstrap";
import TopQuizzes from './QuizzesDeck';
import Loading from './Loading';

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
        const sort_by = (field, reverse, primer) => {
            const key = primer ?
                function(x) {
                return primer(x[field])
                } :
                function(x) {
                return x[field]
                };
            reverse = !reverse ? 1 : -1;
            return function(a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }
        const sortedQuizzes = this.state.quizData.sort(sort_by('rating', true, parseInt));
        this.setState({topRatedQuizzes: sortedQuizzes.slice(0,3)})
    }

    handleClick(e) {
        window.location.assign('http://localhost:9081/users/all');
    }

    render () {
        const course = this.state.course ? (
            <div>
                <TopNavbar/>
                <div className='container-middle'> 
                    <h1 className="center header">{this.state.course.courseName}</h1>
                    <div style={{padding: '10px'}}> </div>
                    <Button variant='light' className='create-quiz center' onClick={this.handleClick.bind(this)}>Create a Quiz</Button>
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