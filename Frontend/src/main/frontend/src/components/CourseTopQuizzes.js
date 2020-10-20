import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TopQuizzes extends Component {
    state = {
        topQuizzes: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            this.setState({
                // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
                topQuizzes: res.data.slice(0,3)
            })
        })
    }

    render () {
        const { topQuizzes } = this.state;
        const topQuizzesList = topQuizzes.length ? (
            topQuizzes.map(quiz => {
                return (
                    <Link to={'/Quizzes/' + quiz.id} className='regular-link' key={quiz.id}>
                        <Card className="course-card">
                            <Card.Title>{quiz.name}</Card.Title>
                        </Card>
                    </Link>
                )
            })
        ):(
            <div className="center"> No top quizzes at the time </div>
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

export default TopQuizzes;