import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class QuizzesDeck extends Component {
    render () {
        const quizzes = this.props.data;
        const quizzesList = quizzes.length ? (
            quizzes.map(quiz => {
                return (
                    <Link to={'/Quizzes/' + quiz._id.$oid} className='regular-link' key={quiz._id.$oid}>
                        <Card className="course-card">
                            <Card.Title>{quiz.quizName}</Card.Title>
                        </Card>
                    </Link>
                )
            })
        ):(
            <div className="center"> No quizzes to show </div>
        )
        return (
            <div>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {quizzesList}
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default QuizzesDeck;