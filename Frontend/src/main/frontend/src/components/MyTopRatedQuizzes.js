import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

// MY TOP RATED QUIZZES - TOP QUIZZES OF A USER (IN THE QUIZZES SECTION)
class MyTopRatedQuizzes extends Component {
    state = {
        topQuizzes: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
            this.setState({
                topQuizzes: res.data.slice(0, 3)
            })
        })
    }

    render () {
        const { topQuizzes } = this.state;
        const topQuizzesList = topQuizzes.length ? (
            topQuizzes.map(quiz => {
                return (
                    <Link to={'/' + quiz.id} className='regular-link' key={quiz.id}>
                        <Card className="course-card">
                            <Card.Title>{quiz.completed}</Card.Title>
                        </Card>
                    </Link>
                )
            })
        ):(
            <div className="center"> No top Quizzes at the moment </div>
        )
        return (
            <div>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {topQuizzesList}
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default MyTopRatedQuizzes;