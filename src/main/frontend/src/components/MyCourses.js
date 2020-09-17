import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MyCourses extends Component {
    render () {
        const myCourses = ['Programming Languages', 
        'Principles of Micro-Economics', 
        'Data Structures and Algorithms',
        'Western Intellectual History'];
        const coursesList = myCourses.length ? (
            myCourses.map(course => {
                return (
                    //<Link to={'/' + course} className='regular-link'>
                        <Card className="course-card">
                        <Link to={'/' + course} className='regular-link'>
                            <Card.Title>{course}</Card.Title>
                        </Link>
                        </Card>
                    //</Link>
                )
            })
        ):(
            <div className="center"> You are not in any courses </div>
        )
        return (
            <div>
            <h1 className='subtitle'> My Courses </h1>
            <Card>
                <CardDeck className="courses-deck">
                    {coursesList}
                </CardDeck>
            </Card>
            </div>
        )
        
        // return (
        //     <div>
        //     <h1 className='subtitle'> My Courses </h1>
        //     <Card>
        //         <CardDeck className="courses-deck">
        //             <Card className="course-card">
        //                 <Card.Title>Calculus I</Card.Title>
        //             </Card>
        //             <Card className="course-card">
        //                 <Card.Title>MUS101</Card.Title>
        //             </Card>
        //             <Card className="course-card">
        //                 <Card.Title>Programming Languages</Card.Title>
        //             </Card>
        //             <Card className="course-card">
        //                 <Card.Title>Biology</Card.Title>
        //             </Card>
        //             <Card className="course-card">
        //                 <Card.Title>Intro to Criminal Justice</Card.Title>
        //             </Card>
        //         </CardDeck>
        //     </Card>
        //     </div>
        // )
    }
}

export default MyCourses;