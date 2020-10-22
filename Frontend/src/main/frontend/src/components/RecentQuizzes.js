import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class RecentQuizzes extends Component {
    state = {
        recentQuizzes: []
        
    }

    componentDidMount() {
        // TODO: GET RECENT QUIZZES FROM BACKEND FOR THIS USER
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        // axios.get('http://localhost:9084/quizzes/get-created-quizzes/').then(res => {    
            this.setState({
                // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
                recentQuizzes: res.data.slice(0,3)
            })
        })
    }

    render () {
        const { recentQuizzes } = this.state;
        const recentQuizzesLength = recentQuizzes.length ? (
            recentQuizzes.map(quiz => {
                return (
                        // CHANGE THE STYLING BELOW IF WE WANT
                        <Link to={'/Quizzes/' + quiz.id} className='regular-link' key={quiz.id}>
                        <Card className="course-card">
                            <Card.Title>{quiz.name}</Card.Title>
                            <Card.Footer> Name of the Course </Card.Footer>
                        </Card>
                        </Link>
                )
            })
        ):(
            <div className="center"> You haven't taken any quizzes recently </div>
        )
        return (
            <div>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {recentQuizzesLength}
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default RecentQuizzes;