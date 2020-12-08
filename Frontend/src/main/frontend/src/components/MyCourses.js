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
import axios from 'axios';
import Loading from './Loading';


class MyCourses extends Component {
    state = {
        myCourses: [],
        coursesIDs: [],
        isLoading: true,
    }

    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        const token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        axios.get('http://pi.cs.oswego.edu:9081/users/' + email, { headers: {"Authorization" : `Bearer ${token}`}}).then(res => {
            if(this.mounted){
                if (this.props.limit === "null" || res.data.split(",").length < 3) {
                    this.setState({
                        coursesIDs: res.data
                    })
                } else if (this.props.limit !== "null" && res.data.split(",").length >= 3) {
                    this.setState({
                        coursesIDs: res.data.split(",").slice(0,3)
                    })
                }
                if (this.state.coursesIDs.length !== 0) {
                    this.getCoursesFromDB();
                } else {
                    this.setState({ isLoading: false})
                }
            }
        }).catch(err => {
            if(this.mounted){
                console.log(err);
                this.setState({
                    isLoading: false
                })
            }
        })
    }

    getCoursesFromDB = () => {
        const sendCourseIDs = this.state.coursesIDs.toString().replace(/[[\]']+/g,"").split(" ").join("");
        const token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        axios.get('http://pi.cs.oswego.edu:9083/courses/get-courses/' + sendCourseIDs, { headers: {"Authorization" : `Bearer ${token}`}}).then(res => {
            if(this.mounted){
                this.setState({
                    myCourses: res.data,
                    isLoading: false
                })
            }
        }).catch(err => {
            if(this.mounted){
                console.log(err);
                this.setState({
                    isLoading: false
                })
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
            <div className="center"> You are not in any courses. </div>
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