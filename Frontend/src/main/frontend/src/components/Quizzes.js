import React, { Component } from 'react'
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import TopQuizzes from './QuizzesDeck';
import TopNavbar from './TopNavbar';
import styled from 'styled-components';
import QuizTable from './QuizTable';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import InstructorQuizTable from './InstructorQuizTable';
import Loading from './Loading';

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

class Quizzes extends Component {
    static contextType = UserContext

    state = {
        createdQuizzesData: [],
        topCreatedQuizzes: [],
        takenQuizzesData: [],
        takenQuizzes: [],
        isLoading: true
    }

    componentDidMount () {        
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        fetch('http://localhost:9084/quizzes/get-created-quizzes/' + email, {method: 'GET',}).then(response => response.json()).then(quizzes => {
            if (this.mounted) {
                this.setState({
                    createdQuizzesData: quizzes
                }, () => {
                    if (this.state.createdQuizzesData.length > 0) {
                        this.getTopRatedQuizzes()
                    }
                })
            }
        })
        axios.get('http://localhost:9081/users/get-quizzes/' + email).then(res => {
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
        axios.get('http://localhost:9084/quizzes/get-quizzes/' + ids).then(res => {
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

        const view = teacher ? (
            <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
            <Tab eventKey="MyQuizzes" title="My created quizzes">
                <Card className='rounded-corner'>
                    <InstructorQuizTable data ={this.state.createdQuizzesData} />
                </Card>
            </Tab>
            <Tab eventKey="QuizHistory" title="Quizzes I took">
                <Card className='rounded-corner'>
                    <InstructorQuizTable data = {this.state.takenQuizzesData} />
                </Card>
            </Tab>
            </Tabs>
        ):(
            <Tabs defaultActiveKey="MyQuizzes" id="uncontrolled-tab-example">
            <Tab eventKey="MyQuizzes" title="My created quizzes">
                <Card className='rounded-corner'>
                    <QuizTable data ={this.state.createdQuizzesData} />
                </Card>
            </Tab>
            <Tab eventKey="QuizHistory" title="Quizzes I took">
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
                <Button variant="light" className='create-quiz' as={Link} to="/CreateQuiz">Create a Quiz</Button>

                <div style={{padding: '10px'}}> </div>
                    <div className='container'>
                        <h1 className='subtitle'> My Top Rated Quizzes </h1>
                        <TopQuizzes data={this.state.topCreatedQuizzes}/>

                        <div className="spacer"></div>
                        <Styles>
                        {view}
                        </Styles>
                        <div style={{padding: '10px'}}> </div>
                    </div>
        
                </div>
            </div>
        )
    }
}

export default Quizzes;