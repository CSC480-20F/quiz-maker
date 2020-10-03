import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class MyCourses extends Component {
    state = {
        myCourses: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            this.setState({
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
                        <Card className="course-card" key={course.id}>
                        <Link to={'/Courses/' + course.id} className='regular-link'>
                            <Card.Title>{course.username}</Card.Title>
                        </Link>
                        </Card>
                )
            })
        ):(
            <div className="center"> You are not in any courses </div>
        )
        return (
            <div>
            <h1 className='subtitle'> My Courses </h1>
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