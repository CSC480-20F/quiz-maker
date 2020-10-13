import React, { Component } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { Button, Card, CardDeck } from 'react-bootstrap';
import { CSVReader } from 'react-papaparse';


class CreateQuiz extends Component {
  state = {
    courses: [],
    chosenCourseID:null
  }

componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
        this.setState({
            // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
            courses: res.data.slice(0,3)
        })
    })
}

courseChosen = (id) => {
  console.log(id);
  this.setState({chosenCourseID: id})
}

render () {
  const { courses } = this.state;
  const coursesList = courses.length ? (
      courses.map(course => {
          return (
                  <Card className="course-card" key={course.id} onClick={e => this.courseChosen(course.id)}>
                      <Card.Title>{course.name}</Card.Title>
                  </Card>
          )
      })
  ):(
      <div className="center"> You are not in any courses </div>
  );
  const chosenCourseIDValue = (this.state.chosenCourseID !== null) ? (
      <>
      <h1 className="subtitle" style={{paddingTop: '30px'}}> What is your quiz about? </h1>
      <h1> Your course is {this.state.chosenCourseID} </h1>
      </>
  ):(
    <>
    <h1 className="subtitle" style={{paddingTop: '30px'}}> Which course are you creating a Quiz for? </h1>
    <Card className='rounded-corner'>
      <CardDeck className="courses-deck">
          {coursesList}
      </CardDeck>
    </Card>
    </>
  )

  return (
    <>
    <TopNavbar/>
      <div className="container-middle">
        <div className="small-spacer"></div>
          {chosenCourseIDValue} 
      </div>  
    </>
  )
}

}

export default CreateQuiz;
