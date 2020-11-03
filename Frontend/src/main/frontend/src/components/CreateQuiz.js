import React, { Component } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { Button, Card, CardDeck } from 'react-bootstrap';
import styled from 'styled-components';
import CreateQuizForm from './CreateQuizForm';
import Loading from './Loading';
import {UserContext} from '../context/UserContext';

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
    font-family: Roboto;
    border-color: white;
  }

  .chosen-topic-card{
    min-width: fit-content;
    color: #8F0047;
    font-family: Roboto;
    font-size: bold;
    border-color: white;
  }

  .topics-deck {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
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

  .courses-deck {
    max-width: 75rem !important;
  }

`;


class CreateQuiz extends Component {
  static contextType = UserContext

  state = {
    isLoading:true,
    courses: [],
    courseIDs: [],
    chosenCourseId:null,
    chosenCourse:null,
    instructorCourses: [],
    topicOptions: [],
    topics: [],
    createQuizSection: false,
    isInstructor: false
  }


  componentDidMount() {
    this.mounted = true;
    if (this.props.match.params.course_id !== undefined) {
      this.setState({
        courseIDs: this.props.match.params.course_id,
        chosenCourseId: this.props.match.params.course_id
      }, () => {this.getChosenCourse()})
    } else {
      const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
      axios.get('http://pi.cs.oswego.edu:9081/users/' + email).then(res => {
        if(this.mounted){
          this.setState({courseIDs: res.data}, () => {this.getCoursesFromDB()})
        }
      }).catch(err => {console.log(err); this.setState({isLoading: false})
      })
      }
  }

  getChosenCourse = () => {
    axios.get('http://pi.cs.oswego.edu:9083/courses/get-courses/' + this.state.chosenCourseId).then(res => {
      if(this.mounted){
        this.setState({chosenCourse: res.data, isLoading: false, topicOptions: res.data[0].topics}, () => this.checkIfInstructor())
      }
    }).catch(err => {console.log(err); this.setState({isLoading: false})
    })
  }

  checkIfInstructor = () => {
    const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    if (this.state.chosenCourse[0].teacher === email) {
      this.setState({isInstructor: true})
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  getCoursesFromDB = () => {
     if (this.state.courseIDs.length > 0) {
      const sendCourseIDs = this.state.courseIDs.toString().replace(/[[\]']+/g,"").split(" ").join("");
      axios.get('http://pi.cs.oswego.edu:9083/courses/get-courses/' + sendCourseIDs).then(res => {
          if(this.mounted){
              this.setState({courses: res.data}, () => {this.getInstructorCourses()})
          }
      }).catch(err => {console.log(err); this.setState({isLoading: false})})
    } else {
      this.getInstructorCourses()
    }
  }

  getInstructorCourses = () => {
    const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    if (this.context.isInstructor) {
      axios.get('http://pi.cs.oswego.edu:9083/courses/get-instructor-courses/' + email).then(res => {
        if (res.data.length > 0) {
          for (var course in res.data) {
            if (this.mounted) {
              this.setState({courses: [...this.state.courses, res.data[course]], isLoading: false})
            }
          }
        } else {
          this.setState({isLoading: false})
        }
      }).catch(err => {console.log(err); this.setState({isLoading: false})})
    }
  }

  addTopic = (topic) => {
    if (!this.state.topics.includes(topic)){
      this.setState({topics: [...this.state.topics, topic]})
    } else {
      const filteredArray = this.state.topics.filter(item => item !== topic)
      this.setState({topics: filteredArray});
    }
  }

  quizCreation = (e) => {
    e.preventDefault();
    this.setState({createQuizSection: true})
  }

  // Once the User chooses the course to create the quiz for, store it so we can re-render
  // We will also use the ID to get more info on the course
  courseChosen = (id) => {
    this.setState({
      chosenCourseId: id
    }, () => {
      const foundCourse = this.state.courses.filter(item => {
        return item._id.$oid === this.state.chosenCourseId
      })
      this.setState ({chosenCourse: foundCourse, topicOptions: foundCourse[0].topics}, () => this.checkIfInstructor())
    })
  }

  render () {
    if (this.state.isLoading) {
      return <> <TopNavbar/> <div className="container-center"><Loading type={'spin'} color={'#235937'}/> </div> </>
    }

    // Once a specific course has been chosen, display this instead of all courses
    const specificCourse = this.state.chosenCourse !== null ? (
      this.state.chosenCourse.map(course => {
          return (
            <Card className="course-card specific-course-card" key={course._id.$oid}>
                <Card.Title>{course.courseName}</Card.Title>
            </Card>
          )
      })
    ):(
        <div className="center"> Loading... </div>
    );

    // If a course hasn't been chosen yet, display all courses they are enrolled in
    const coursesList = this.state.courses.length ? (
        this.state.courses.map(course => {
            return (
              <Card className="course-card" key={course._id.$oid} onClick={e => this.courseChosen(course._id.$oid)}>
                  <Card.Title>{course.courseName}</Card.Title>
              </Card>
            )
        })
    ):(
        <div className="center"> You are not in any courses </div>
    );

    const topics = this.state.topicOptions.map((topic,i) => {
          return (
            <Card onClick={e => this.addTopic(topic)} className={this.state.topics.includes(topic) ? ("chosen-topic-card"):("topic-card")} key = {i}>
                {topic}
            </Card>
          )
      })

  const quizCreationButton = this.state.topics.length ? (
    <div className="container">
    <div className="spacer"></div>
    <Button className="create-quiz" variant="light" onClick={this.quizCreation}> Go to Quiz Creation </Button>
    </div>
  ):(
    <div className="container"></div>
  )

    // Switch view depending on if a course has been choosen or not, and if you have started creating a Quiz or Not
    const createQuizPart = this.state.createQuizSection ? (
      <CreateQuizForm courseID={this.state.chosenCourseId} topics={this.state.topics} professor={this.state.isInstructor}/>
    ):(
      (this.state.chosenCourseId !== null) ? (
        <>
        <h1 className="subtitle" style={{paddingTop: '30px'}}> What is your quiz about? </h1>
        <Card className='main-card'>
        <CardDeck className="courses-deck">
          {specificCourse}
        </CardDeck>
        
        <CardDeck className="topics-deck">
          {topics}
        </CardDeck>
        </Card>
          {quizCreationButton}
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
        <div className="container-middle" style={{backgroundColor: "#F2F2F2"}}>
          <div className="small-spacer"></div>
            <Styles>
            {createQuizPart} 
            </Styles>
        </div>  
      </>
    )
  }

}

export default CreateQuiz;
