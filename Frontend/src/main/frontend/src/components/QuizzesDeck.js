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
            <div className="center"> No quizzes created. Go ahead and <Link className="create-link" to="/CreateQuiz">create one.</Link></div>
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