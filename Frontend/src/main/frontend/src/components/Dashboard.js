import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MyCourses from './MyCourses';
import RecentQuizzes from './QuizzesDeck';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import Loading from './Loading';
import {UserContext} from '../context/UserContext';
import InstructorCourses from './InstructorCourses';



class Dashboard extends Component {
    static contextType = UserContext

    state = {
        quizzesDeckData: [],
        createdQuizzes: [],
        isLoading: true
    }



    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://pi.cs.oswego.edu:9084/quizzes/get-created-quizzes/' + email).then(res => {
            if(this.mounted){
                this.setState({createdQuizzes: res.data}, () => {this.getRecentQuizzes()})
            }
        }).catch(err => {console.log(err); this.setState({isLoading: false})})
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
        this.setState({quizzesDeckData: temp.slice(0,3), isLoading: false})
    }

    render () {
        if (this.state.isLoading) {
            return <> <TopNavbar/> <div className="container-center"><Loading type={'spin'} color={'#235937'}/> </div> </>
        }

        const teacher = this.context.isInstructor;

        const view = teacher === true ? (
            <InstructorCourses limit="3"/>
        ):(
            <MyCourses limit="3"/>
        )

        return (
            <div>
                <div> <TopNavbar/> </div>
                
                <div className="container-middle">
                <div className="header"> Fall 2020 </div>    
                <div style={{padding: '10px'}}> </div>
                <Button variant="light" id="dark-mode-button" className='create-quiz' as={Link} to="/CreateQuiz">Create a Quiz</Button>
                    <div className='container'>
                        <h1 className='subtitle'> My Courses </h1>
                        {view}
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