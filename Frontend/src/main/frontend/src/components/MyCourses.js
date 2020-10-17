import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';


class MyCourses extends Component {
    state = {
        myCourses: [],
        isLoading: true,
        mounted: false,
    }

    componentDidMount() {
        this.mounted = true;
        axios.get('http://localhost:9083/courses/all').then(res => {
            if(this.mounted){
                this.setState({
                    // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
                    myCourses: res.data,
                    isLoading: false
                })
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false
            })
        })
    }

    componentWillUnmount(){
        this.mounted = false;
      }

    render () {
        if (this.state.isLoading) {
            return <div className="container-middle"><Loading type={'balls'} color={'#6495ED'}/></div>
        }

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