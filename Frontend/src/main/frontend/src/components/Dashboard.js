import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MyCourses from './MyCourses';
import RecentQuizzes from './QuizzesDeck';
import TopNavbar from './TopNavbar';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        quizzesDeckData: [],
        createdQuizzes: []
    }

    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://localhost:9084/quizzes/get-created-quizzes/' + email).then(res => {
            if(this.mounted){
                this.setState({createdQuizzes: res.data}, () => {this.getRecentQuizzes()})
            }
        }).catch(err => {console.log(err)})
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getRecentQuizzes = () => {
        var temp = [...this.state.createdQuizzes]
        temp.map(quiz => {
            return quiz.date = new Date(parseInt(quiz._id.$oid.substring(0, 8), 16) * 1000).toISOString();
        })
        temp.sort((a,b) => -a.date.localeCompare(b.date))
        this.setState({quizzesDeckData: temp.slice(0,3)})
    }

    render () {
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
                        <RecentQuizzes data={this.state.quizzesDeckData}/>
                        <div style={{padding: '10px'}}></div>
                    </div>
        
                </div>
            </div>
        )
    }
}

export default Dashboard;