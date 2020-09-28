import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TopQuizzes extends Component {
    state = {
        topQuizzes: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
            this.setState({
                topQuizzes: res.data.slice(0, 4)
            })
        })
    }

    render () {
        const { topQuizzes } = this.state;
        const topQuizzesList = topQuizzes.length ? (
            topQuizzes.map(quiz => {
                return (
                        <Card className="course-card" key={quiz.id}>
                        <Link to={'/' + quiz.id} className='regular-link'>
                            <Card.Title>{quiz.completed}</Card.Title>
                        </Link>
                        </Card>
                )
            })
        ):(
            <div className="center"> No top Quizzes at the moment </div>
        )
        return (
            <div>
            <h1 className='subtitle'> Top Quizzes </h1>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {topQuizzesList}
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default TopQuizzes;