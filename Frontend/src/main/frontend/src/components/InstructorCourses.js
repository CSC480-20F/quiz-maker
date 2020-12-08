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
        token: window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }

    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://pi.cs.oswego.edu:9083/courses/get-instructor-courses/' + email, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
            if(this.mounted){
                if (this.props.limit === "null" || res.data.length < 3) {
                    this.setState({myCourses: res.data, isLoading: false})
                } else if (this.props.limit !== "null" && res.data.length >= 3) {
                    this.setState({myCourses: res.data.slice(0,3), isLoading: false})
                }
            }
        }).catch(err => {
            if(this.mounted){
                console.log(err);
                this.setState({isLoading: false})
            }
        })
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render () {
        if (this.state.isLoading) {
            return <div className="container-middle"><Loading type={'spin'} color={'#235937'}/></div>
        }

        const { myCourses } = this.state;
        const coursesList = myCourses.length ? (
            myCourses.map(course => {
                return (
                    <Link to={`/Courses/${course._id.$oid}`} className='regular-link' key={course._id.$oid}>
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