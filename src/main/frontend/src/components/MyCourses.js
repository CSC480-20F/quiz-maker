import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';

class MyCourses extends Component {
    render () {
        return (
            <div>
            <h1 className='subtitle'> My Courses </h1>
            <Card>
                <CardDeck className="courses-deck">
                    <Card className="course-card">
                        <Card.Title>Calculus I</Card.Title>
                    </Card>
                    <Card className="course-card">
                        <Card.Title>MUS101</Card.Title>
                    </Card>
                    <Card className="course-card">
                        <Card.Title>Programming Languages</Card.Title>
                    </Card>
                    <Card className="course-card">
                        <Card.Title>Biology</Card.Title>
                    </Card>
                    <Card className="course-card">
                        <Card.Title>Intro to Criminal Justice</Card.Title>
                    </Card>
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default MyCourses;