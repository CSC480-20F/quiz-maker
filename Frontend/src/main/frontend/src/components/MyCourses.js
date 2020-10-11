import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class MyCourses extends Component {
    state = {
        myCourses: []
    }

    componentDidMount() {
        axios.get('https://localhost:9083/courses/all').then(res => {
            this.setState({
                // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
                myCourses: res.data
            })
        })
    }

    render () {
        // const myCourses = ['Programming Languages', 
        // 'Principles of Micro-Economics', 
        // 'Data Structures and Algorithms',
        // 'Western Intellectual History'];
        const { myCourses } = this.state;
        const coursesList = myCourses.length ? (
            myCourses.map(course => {
                return (
                    <Link to={'/Courses/' + course._id.$oid} className='regular-link' key={course._id.$oid}>
                        <Card className="course-card">
                            <Card.Title>{course.courseName}</Card.Title>
                        </Card>
                    </Link>
                )
            })
        ):(
            <div className="center"> You are not in any courses </div>
        )
        return (
            <div>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {coursesList}
                </CardDeck>
            </Card>
            </div>
        )
    }
}

export default MyCourses;