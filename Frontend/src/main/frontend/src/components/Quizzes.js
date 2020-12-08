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
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import TopQuizzes from './QuizzesDeck';
import TopNavbar from './TopNavbar';
import QuizTable from './QuizTable';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import InstructorQuizTable from './InstructorQuizTable';
import Loading from './Loading';

class Quizzes extends Component {
    static contextType = UserContext

    state = {
        createdQuizzesData: [],
        topCreatedQuizzes: [],
        takenQuizzesData: [],
        takenQuizzes: [],
        isLoading: true,
        token: window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }

    componentDidMount () {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://pi.cs.oswego.edu:9082/quizzes/get-created-quizzes/' + email, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
            if (this.mounted) {
                this.setState({
                    createdQuizzesData: res.data
                }, () => {
                    if (this.state.createdQuizzesData.length > 0) {
                        this.getTopRatedQuizzes()
                    }
                })
            }
        })
        axios.get('http://pi.cs.oswego.edu:9081/users/get-quizzes/' + email, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
            if(this.mounted){
                this.setState({takenQuizzes: res.data}, () => {
                    if (this.state.takenQuizzes.length > 0) {
                        this.getTakenQuizzes()
                    } else {
                        this.setState({isLoading: false})
                    }
                })
            }
        }).catch(err => {console.log(err); this.setState({isLoading: false})})
    }

    componentWillUnmount () {
        this.mounted = false;
    }

    getTopRatedQuizzes = () => {
        var obj = [...this.state.createdQuizzesData];
        obj.sort((a,b) => b.rating - a.rating);
        this.setState({topCreatedQuizzes: obj.slice(0,3)})
    }

    getTakenQuizzes = () => {
        const ids = this.state.takenQuizzes.replace(/[[\]']+/g,'').split(" ").join("");
        axios.get('http://pi.cs.oswego.edu:9082/quizzes/get-quizzes/' + ids, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
            if(this.mounted){
                this.setState({takenQuizzesData: res.data, isLoading: false})
            }
        }).catch(err => {console.log(err); this.setState({isLoading: false})})
    }

    render () {
        if (this.state.isLoading) {
            return <> <TopNavbar/> <div className="container-center"><Loading type={'spin'} color={'#235937'}/> </div> </>
        }

        const teacher = this.context.isInstructor;

        const view = teacher === true ? (
            <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
            <Tab eventKey="MyQuizzes" title="My Created Quizzes">
                <Card className='rounded-corner'>
                    <InstructorQuizTable data ={this.state.createdQuizzesData} />
                </Card>
            </Tab>
            <Tab eventKey="QuizHistory" title="Quizzes I Took">
                <Card className='rounded-corner'>
                    <InstructorQuizTable data = {this.state.takenQuizzesData} />
                </Card>
            </Tab>
            </Tabs>
        ):(
            <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
            <Tab eventKey="MyQuizzes" title="My Created Quizzes">
                <Card className='rounded-corner'>
                    <QuizTable data ={this.state.createdQuizzesData} />
                </Card>
            </Tab>
            <Tab eventKey="QuizHistory" title="Quizzes I Took">
                <Card className='rounded-corner'>
                    <QuizTable data = {this.state.takenQuizzesData} />
                </Card>
            </Tab>
            </Tabs>
        )

        return (
            <div>
                <div> <TopNavbar/> </div>

                <div className="container-middle">
                <div className="header"> Quizzes </div>
                <div style={{padding: '10px'}}> </div>
                <Button variant="light" id="dark-mode-button" className='create-quiz' as={Link} to="/CreateQuiz">Create a Quiz</Button>

                <div style={{padding: '10px'}}> </div>
                    <div className='container'>
                        <h1 className='subtitle'> My Top Rated Quizzes </h1>
                        <TopQuizzes data={this.state.topCreatedQuizzes}/>

                        <div className="spacer"></div>
                        {view}
                        <div style={{padding: '10px'}}> </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Quizzes;
