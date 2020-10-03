import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';
import { Button, Card } from "react-bootstrap";
import TopQuizzes from './TopQuizzes';

class Course extends Component {
    state = {
        post: null,
        textID: ''
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("https://jsonplaceholder.typicode.com/users/" + id).then(res => {
            this.setState({
                post: res.data
            })
        })
        
    }

    handleClick(e) {
        window.location.assign('http://localhost:9081/users/all');
    }

    render () {
        const post = this.state.post ? (
            <div>
                <TopNavbar/>
                <div className='container-middle'> 
                    <h1 className="center header">{this.state.post.name}</h1>
                    <div style={{padding: '10px'}}> </div>
                    <Button className ='center' variant='warning' className='create-quiz' onClick={this.handleClick.bind(this)}>Create a Quiz</Button>
                </div>

                <div className='container'>
                    <div style={{padding: '10px'}}> </div>
                    <TopQuizzes />

                    <div style={{padding: '10px'}}> </div>
                    <h1 className='subtitle'> Quizzes </h1>
                    <Card className='rounded-corner'>
                        <QuizTable />
                    </Card>
                </div>
            </div>
        ) : (
            <div> <TopNavbar/>
            <div className="container"> Loading course...</div>
            </div>
        )
        return(
            <div>
                {post}
                <h1 className='header'> {this.state.textID} </h1>
            </div>
        )
    }
}

export default Course;