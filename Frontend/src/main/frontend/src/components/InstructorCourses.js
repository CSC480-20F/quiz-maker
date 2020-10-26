import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Loading from './Loading';

const Style = styled.div`
    .create-link {
        color: #8F0047;
        font-weight: bold;
        font-family: Roboto;
    }
`;

class InstructorCourses extends Component {
    state = {
        myCourses: [],
        isLoading: true,
    }

    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        // TODO: GET COURSES THAT THIS USER IS AN INSTRUCTOR IN - WE WILL PASS LIMIT AS A PROP LIKE LAST TIME IN "MYCOURSES"
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render () {
        if (this.state.isLoading) {
            return <div className="container-middle"><Loading type={'balls'} color={'#235937'}/></div>
        }

        const { myCourses } = this.state;
        const coursesList = myCourses.length ? (
            myCourses.map(course => {
                return (
                    <Link to={`/Courses/${course.courseId}/`} className='regular-link' key={course.courseId}>
                        <Card className="course-card">
                            <Card.Title>{course.courseName}</Card.Title>
                        </Card>
                    </Link>
                )
            })
        ):(
            <div className="center"> You don't have any course created. Go ahead and <Link className="create-link" to="/RosterUpload">create one.</Link> </div>
        )
        return (
            <Style>
            <Card className='rounded-corner'>
                <CardDeck className="courses-deck">
                    {coursesList}
                </CardDeck>
            </Card>
            </Style>
        )
    }
}

export default InstructorCourses;