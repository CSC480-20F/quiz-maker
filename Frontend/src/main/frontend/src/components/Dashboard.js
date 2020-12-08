// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
        isLoading: true,
        token: window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }



    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://pi.cs.oswego.edu:9082/quizzes/get-created-quizzes/' + email, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
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
                <Button title="Create a Quiz" variant="light" id="dark-mode-button" className='create-quiz' as={Link} to="/CreateQuiz">Create a Quiz</Button>
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