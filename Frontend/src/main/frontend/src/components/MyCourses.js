import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';


class MyCourses extends Component {
    state = {
        myCourses: [],
        coursesIDs: [],
        isLoading: true
    }

    componentDidMount() {
        this.mounted = true;
        const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
        axios.get('http://pi.cs.oswego.edu:9081/users/' + email).then(res => {
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
        axios.get('http://pi.cs.oswego.edu:9083/courses/get-courses/' + sendCourseIDs).then(res => {
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