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
import {Card, Form, Col, Button, Spinner, Row} from 'react-bootstrap';
import styled from 'styled-components';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';

const Style = styled.div`
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

    .topic-input {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      padding-left: 15px;
      box-shadow: none;
    }

    .submit-button {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      min-width: 25%;
      align-self: center;
    }

    .save-button {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      max-width: fit-content;
      align-self: flex-end;
    }

    .topic-col {
      align-self: baseline;
      min-width: fit-content;
      max-width: 30%;
    }

    .remove {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      min-width: fit-content;
    }
`;

class ManageTopics extends Component {
    state = {
        topics: [],
        topic: "",
        sendingTopic: false,
        loadingTopics: true,
        token: window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }

    componentDidMount () {
      let id = this.props.courseID
      axios.get("http://localhost:9083/courses/get-courses/" + id, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
        this.setState({topics: res.data[0].topics, loadingTopics: false})
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

    removeTopic = (topic) => {
      console.log("Remove: ", topic)
      const filteredArray = this.state.topics.filter(item => item !== topic)
      this.setState({topics: filteredArray});
    }

    saveTopics = () => {
      if (this.state.topics.length > 0) {
        this.setState({sendingTopic: true})
        axios.post(`http://localhost:9083/courses/update-topics`, {
          "courseID": this.props.courseID,
          "topics":this.state.topics
        }, { headers: {"Authorization" : `Bearer ${this.state.token}`}}).then(res => {
          NotificationManager.success('Topics successfully updated!', 'Topics Updated', 3000);
          this.setState({sendingTopic: false})
        }).catch(error =>{
          NotificationManager.error('Problem updating topics. Try again!', 'Error', 4000);
          this.setState({sendingTopic: false})
          console.log(error);
        })  
      } else {
        NotificationManager.error('You need to have at least one topic!', 'Need Topics', 4000);
      }
    }

    render () {
        const topics = this.state.topics ? (
            this.state.topics.map((topic,i) => {
                return (
                  <Row className="justify-content-md-center" style={{alignItems: "baseline"}} key={i}>
                    <Col xs lg="2" className="purpleColor" style={{cursor: "default"}}>{topic}</Col>
                    <Col xs lg="1"><Button variant="light" id="dark-mode-button" onClick={() => this.removeTopic(topic)} className="rounded-corner remove"> X </Button></Col>
                  </Row>
                )
            })
        ):(
            <h1>No topics</h1>
        )

        const content = this.state.sendingTopic ? (
          <div className="container-middle"><Spinner animation="border" variant="dark" /> Updating Topics...</div>
        ):(
          this.state.loadingTopics ? (
            <div className="container-middle"><Spinner animation="border" variant="dark" /> Getting Topics...</div>
          ):(
            <>
            <div>{topics}</div>

            <div className="small-spacer"></div>
            <div className="container-middle">
            <Form inline>
                <Col xs="auto">
                <Form.Control required className="topic-input mb-2 mr-sm-2" type="text" placeholder="Write a topic..." value={this.state.topic} onChange={this.onTopicChange.bind(this)} aria-label="Input a topic to add"/>
                </Col>
                <Col xs="auto"><Button variant="light" id="dark-mode-button" className="submit-button rounded-corner mb-2" onClick={() => this.addTopic()}> Add Topic </Button> </Col>
            </Form>
            </div>

            <Button variant="light" id="dark-mode-button" className="save-button rounded-corner" onClick={() => this.saveTopics()}>Save Changes</Button>
            </>
          )
        )

        return (
            <Style>
            <div className="container">
            <h1 className="subtitle"> Manage Topics </h1>
            <Card className="rounded-corner main-card">
              {content}
            </Card>
            </div>
            </Style>
        )
    }
}

export default ManageTopics;