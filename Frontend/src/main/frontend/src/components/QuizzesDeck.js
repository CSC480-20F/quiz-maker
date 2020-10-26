import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Style = styled.div`
    .create-link {
        color: #8F0047;
        font-weight: bold;
        font-family: Roboto;
    }
`;

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
            <div className="center"> You don't have any quizzes created. Go ahead and <Link className="create-link" to="/CreateQuiz">create one.</Link></div>
        )
        return (
            <Style>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {quizzesList}
                </CardDeck>
            </Card>
            </Style>
        )
    }
}

export default QuizzesDeck;