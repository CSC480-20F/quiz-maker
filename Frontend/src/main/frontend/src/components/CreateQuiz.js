import React, { Component } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { Button, Card, CardDeck, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import CreateQuizForm from './CreateQuizForm';

// 💅 Styling  
const Styles = styled.div`
  .topic-input {
    padding: 30px;
  }

  .specific-course-card {
    max-width: fit-content !important;;
  }

  .topic-card {
    min-width: fit-content;
  }

  .topics-deck {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }

  .main-card {
    max-width: 75rem;
    border-radius: 20px;
  }

  .create-quiz {
    max-width: 25rem;
    min-width: 20rem;
    align-self: center;
  }

`;


class CreateQuiz extends Component {
  state = {
    courses: [],
    chosenCourseID:null,
    chosenCourse:[],
    topic: "",
    topics: [],
    createQuizSection: false,
  }

  // TODO: Get the courses that this user is in
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
        this.setState({
            // SLICE MEANS WE ONLY TAKE THE FIRST 3, THIS IS JUST FOR TESTING, CAN GET RID OF IT LATER
            courses: res.data.slice(0,3)
        })
    })
  }

  onTopicChange(event) {this.setState({topic:event.target.value})}

  onSubmitTopic = (e) => {
    e.preventDefault()
    this.setState({topics: [...this.state.topics,this.state.topic], topic: ""}, () => {console.log(this.state)})
  }

  quizCreation = (e) => {
    e.preventDefault();
    this.setState({createQuizSection: true})
  }

  // Once the User chooses the course to create the quiz for, store it so we can re-render
  // We will also use the ID to get more info on the course
  courseChosen = (id) => {
    this.setState({
      chosenCourseID: id
    }, () => {
      const foundCourse = this.state.courses.filter(item => {
        return item.id === this.state.chosenCourseID
      })
      this.setState ({
        chosenCourse: foundCourse
      })
    })
  }

  render () {
    // Once a specific course has been chosen, display this instead of all courses
    const specificCourse = this.state.chosenCourse.length ? (
      this.state.chosenCourse.map(course => {
          return (
            <Styles>
            <Card className="course-card specific-course-card" key={course.id}>
                <Card.Title>{course.name}</Card.Title>
            </Card>
            </Styles>
          )
      })
    ):(
        <div className="center"> Loading... </div>
    );

    // If a course hasn't been chosen yet, display all courses they are enrolled in
    const coursesList = this.state.courses.length ? (
        this.state.courses.map(course => {
            return (
              <Card className="course-card" key={course.id} onClick={e => this.courseChosen(course.id)}>
                  <Card.Title>{course.name}</Card.Title>
              </Card>
            )
        })
    ):(
        <div className="center"> You are not in any courses </div>
    );

    const topics = this.state.topics.length ? (
      this.state.topics.map(topic => {
          return (
            <Styles>
            <Card key={Math.random()*5} className="topic-card">
                <Card.Footer>{topic}</Card.Footer>
            </Card>
            </Styles>
          )
      }) 
  ):(
      <Card className="topic-card"> <Card.Footer> No topics added yet </Card.Footer></Card>
  ); 

  const quizCreationButton = this.state.topics.length ? (
    <Styles>
    <div className="container">
    <div className="spacer"></div>
    <Button className="create-quiz" variant="light" onClick={this.quizCreation}> Go to Quiz Creation </Button>
    </div>
    </Styles>
  ):(
    <div className="container"></div>
  )

    // Switch view depending on if a course has been choosen or not, and if you have started creating a Quiz or Not
    const createQuizPart = this.state.createQuizSection ? (
      <CreateQuizForm courseID={this.state.chosenCourseID} topics={this.state.topics}/>
    ):(
      (this.state.chosenCourseID !== null) ? (
        <>
        <h1 className="subtitle" style={{paddingTop: '30px'}}> What is your quiz about? </h1>
        <Styles>
        <Card className='main-card'>
        <CardDeck className="courses-deck">
          {specificCourse}
        </CardDeck>
        <InputGroup className="topic-input">
          <FormControl value={this.state.topic} onChange={this.onTopicChange.bind(this)} placeholder="Add a topic" aria-label="topics" aria-describedby="basic-addon2"/>
          <InputGroup.Append> <Button variant="outline-secondary" onClick={this.onSubmitTopic}>Add Topic</Button> </InputGroup.Append>
        </InputGroup>
        <CardDeck className="topics-deck">
          {topics}
        </CardDeck>
        </Card>
          {quizCreationButton}
        </Styles>
        <div className="small-spacer"></div>
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
    )

    return (
      <>
      <TopNavbar/>
        <div className="container-middle">
          <div className="small-spacer"></div>
            {createQuizPart} 
        </div>  
      </>
    )
  }

}

export default CreateQuiz;
