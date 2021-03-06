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

import React from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { Button, Form, Card, Col } from 'react-bootstrap';
import { CSVReader } from 'react-papaparse';
import styled from 'styled-components';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {UserContext} from '../context/UserContext';
  
const buttonRef = React.createRef()

const Style = styled.div`
    .header {
      background-color:#F2F2F2;
      border: 0;
      box-shadow: none;
    }

    .purpleColor {
      color: #8F0047;
      font-weight: bold;
    }

    .span {
      font-family: Roboto;
    }

    .main-card {
      padding: 30px;
    }

    .note {
      padding-top: 25px;
    }

    .topic-input {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      padding-left: 15px;
      box-shadow: none;
    }

    .no-border {
      border: 0;
      box-shadow: none;
    }

    .submit-button {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      min-width: 25%;
      align-self: center;
    }
`;

class RosterUpload extends React.Component {
  static contextType = UserContext

  constructor(props) {
    super(props);
    this.state = {
        "response": [],
        "emails": [],
        "names": [],
        "course": "",
        "professor": window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
        "topics": [],
        "topic": "",
        "courseID": "",
        "token": window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }
  }

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnDrop = (data) => {
    this.setState({
      "response": data
    })
    this.setState({
      "emails": this.state.response.map(d => {
        return d.data.Emails;
      }),
      "names": this.state.response.map(d => {
        return d.data.Name;
      })
    })
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log(data)
  }

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  onCourseChange(event) {
	  this.setState({course: event.target.value})
  }

  postToUsers = () => {
    console.log("Posting to the User's DB");
    axios.put(`http://pi.cs.oswego.edu:9081/users/add-course`, {
    "id": this.state.courseID,
    "names": this.state.names,
    "emails": this.state.emails
    }, { headers: {"Authorization" : `Bearer ${this.state.token}`}})
    .then(res => {
      this.postTopics();
    }).catch(error =>{
      console.log(error);
      NotificationManager.error('Problem creating the Course. Please try again 😞', 'Error', 4000);
    })
  }

  postTopics = () => {
    console.log("Posting topics DB");
    axios.put(`http://pi.cs.oswego.edu:9083/courses/add-topics`, {
    "courseID": this.state.courseID,
    "topics": this.state.topics
    }, { headers: {"Authorization" : `Bearer ${this.state.token}`}})
    .then(res => {
      NotificationManager.success('Course successfully created! 🥳', 'Course Created', 4000);
      this.props.history.push('/');
    }).catch(error =>{
      console.log(error);
      NotificationManager.error('Problem creating the Course. Please try again 😞', 'Error', 4000);
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    const courseName = this.state.course.replace(/,/g,"");
    const teacherEmail = this.state.professor;
    const emails = this.state.emails.toString();
    const sendString = teacherEmail + "," + courseName + "," + emails;


    if (this.state.emails.length === 0) {
      NotificationManager.info('You need to upload a Roster properly! 😅', 'Check Roster', 4000);
      return;
    }


     if (!this.state.topics.length > 0) {
      NotificationManager.info('You need to add at least one topic! 😅', 'Need Topics', 4000);
      return;
    }

    axios.get('http://pi.cs.oswego.edu:9083/courses/create-course/' + sendString, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
      this.setState({
        courseID: res.data
      })
      this.postToUsers();
    }).catch(err => {
      console.log(err);
      NotificationManager.error('Problem creating the Course. Please try again 😞', 'Error', 4000);
    })
  }

  onTopicChange(event) {this.setState({topic: event.target.value})}

  addTopic = () => {
    if (this.state.topic.length > 0) {
      if (this.state.topics.includes(this.state.topic)) {
        NotificationManager.info('Topics already exists 🥴', 'Topics Exists', 3000); 
        return;
      }
      this.setState({
        topics: [...this.state.topics, this.state.topic],
        topic: ""
      })
    }
  }

  render() {
    const teacher = this.context.isInstructor;

    const topics = this.state.topics.length ? (
      this.state.topics.map((topic,i) => {
        return (
          <div key={i}> {topic} </div>
        )
      })
    ): (
      <span> No topics added yet </span>
    )

    const view = teacher === true ? (
      <Style>
        <div className="container">
        <div className="small-spacer"></div>

        <Form id="course-form" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Row>
          <Form.Control required id="form-input" className="header no-border" size="sm" type="text" placeholder="Course Title..." value={this.state.course} onChange={this.onCourseChange.bind(this)}/>
          </Form.Row>
        
        <div className="spacer"></div>

        <Card className="main-card rounded-corner">
        <CSVReader
          required
          config={{header: true, skipEmptyLines: true}}
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span className='span'>Drop your <span className="purpleColor">class roster</span> CSV file here or click to upload.</span>
        </CSVReader>

        <div className="note container-middle">Note: Please make sure the column with student emails is titled "Emails" and
        the column with student names is titled "Name"</div>

        <div className="small-spacer"></div>

        <div className="container-middle">
        <Form inline>
          <Col xs="auto">
          <Form.Control required className="topic-input mb-2 mr-sm-2" type="text" placeholder="Write a topic..." value={this.state.topic} onChange={this.onTopicChange.bind(this)}/>
          </Col>
          <Col xs="auto"><Button variant="light" className="submit-button rounded-corner mb-2" onClick={() => this.addTopic()}> Add Topic </Button> </Col>
        </Form>
        </div>

        <div className="container-middle"> <span className="purpleColor">{topics}</span> </div>

        <div className="small-spacer"></div>
        <Button type="submit" variant="light" className="submit-button rounded-corner"> Create Course </Button>
        </Card>

        </Form>
        </div>
      </Style>
    ):(
      <div className="container">
        <span role="img" aria-label="Restricted Access" className="header"> You do not have access to this page ❌ </span> 
      </div>

    )
    
    return (
      <>
        <TopNavbar/>
        {view}
      </>
    )
  }

}

export default RosterUpload;
