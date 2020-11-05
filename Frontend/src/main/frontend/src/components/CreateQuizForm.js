import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Modal, Button, Card, Form, Col, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// 💅 Stylesheet for this babay
const Style = styled.div`
    .edit {
      max-height: 20%;
    }

    .header {
      background-color:#F2F2F2;
    }

    .label {
      border: 1px;
      border-radius: 15px;
      padding-left: 15px;
      padding-right: 15px;
      border-color: white;
      box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
      border-style: solid;
      margin-right: 0px;
    }

    ${'' /* .answer-field {
      box-shadow: 3px 3px 3px #ECECEC;
      border-color: #F5F3F3;
      border-radius: 15px;
      margin-left: 0px;
    } */}

    .no-border {
      border: 0;
      box-shadow: none;
    }

    .description {
      font-family: Roboto;
      font-size: 20px;
      max-width: 85rem;
    }

    .topicsColor {
      color: #8F0047;
      max-width: 30rem;
    }

    .center {
      margin-left: 20px;
    }

    .delete-quiz-button {
      float: right;
      padding: 18px;
      margin-right: 15px;
      color: white;
      background-color:#E93232;
      border-color:#E93232;
    }

    .publish-quiz-button {
      float: right;
      padding: 18px;
      color: white; 
      background-color: #1C9B2F;
      border-color: #1C9B2F;
    }

    .add-topic-button {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      min-width: 15%
    }

    .add-question-button {
      background-color: #8F0047;
      color: white;
      font-family: Roboto;
      min-width: 25%
    }

    .quiz-question {
      padding: 20px 50px 20px 50px;
      min-width: 70rem;
      max-width: 80rem;
    }

    .button-group {
      text-align: -webkit-center;
    }

    .whole-question-card {
      padding: 20px;
      box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
    }

    .label {
      border: 1px;
      border-radius: 15px;
      padding-left: 15px;
      padding-right: 15px;
      border-color: white;
      box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
      border-style: solid;
      margin-right: 0px;
    }

    .answer-field {
      box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
      border-color: #F5F3F3;
      border-radius: 15px;
      margin-left: 0px;
      background-color: white;
    }

    .correct-answer-field {
      box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
      border-color: #F5F3F3;
      border-radius: 15px;
      margin-left: 0px;
      background-color: green;
      font-weight: bolder;
    }
`;


class CreateQuizForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "quiz_title":"",
      "creator":window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
      "isInstructor": this.props.professor,
      "courseID":this.props.courseID,
      "topics":this.props.topics,
      "index":0,
      "question":"",
      "correct_answer":"",
      "incorrect_answer1":"",
      "incorrect_answer2":"",
      "incorrect_answer3":"",
      "incorrect_answer4":"",
      "incorrect_answers":[],
      "questions":[],
      "show": false,
      "importShow": false,
      "chosenQuiz": [],
      "chosenQuestion": null,
      "starredQuizzes": [],
      "gettingQuizzes": true
    }
  }
        

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      incorrect_answers: [...this.state.incorrect_answers, this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3, this.state.incorrect_answer4]
    }, () => {
      var obj = {question: this.state.question, answer: this.state.correct_answer, incorrect_answers: this.state.incorrect_answers};
      this.setState({
        questions: [...this.state.questions, obj],
        question:"",
        correct_answer:"",
        incorrect_answer1:"",
        incorrect_answer2:"",
        incorrect_answer3:"",
        incorrect_answer4:"",
        incorrect_answers:[],
        index:this.state.index + 1
      });
    })
  }

    onQuizTitleChange(event) {
      this.setState({quiz_title: event.target.value})
    }

    onQuestionChange(event) {
      this.setState({question: event.target.value})
    }

    onCorrect_answerChange(event){
      this.setState({correct_answer: event.target.value})
    }

    onIncorrect_answerChange1(event){
      this.setState({incorrect_answer1:event.target.value});
    }

    onIncorrect_answerChange2(event){
      this.setState({incorrect_answer2:event.target.value});
    }

    onIncorrect_answerChange3(event){
      this.setState({incorrect_answer3:event.target.value});
    }

    onIncorrect_answerChange4(event){
      this.setState({incorrect_answer4:event.target.value});
    }

    onCreateQuiz = (e) => {
      e.preventDefault();
      if (this.state.questions.length === 0) {
        NotificationManager.info('You need to add at least one question! 😅', 'Question Needed', 4000);
        return; 
      }
      axios.post(`http://pi.cs.oswego.edu:9084/quizzes/add-quiz`, {
        "quizName":this.state.quiz_title,
        "creator":this.state.creator,
        "courseID":this.state.courseID,
        "quizTopics":this.state.topics,
        "quizQuestions":this.state.questions,
        "rating": 0,
        "starred": false
      })
      .then(res => {
        this.setState ({
          "quiz_title":"",
          "topic":"",
          "index":0
        })
        NotificationManager.success('Quiz Posted Successfully! 🥳', 'Quiz Posted', 4000);
        this.props.history.push('/Courses/' + this.state.courseID);
      }).catch(error =>{
        NotificationManager.error('Problem posting the Quiz 😞', 'Error', 4000);
        console.log(error);
      })  
    }

    handleClose = () => {this.setState({show: false})}
    handleShow = () => {this.setState({show: true})}

    handleImportClose = () => {this.setState({importShow: false, "chosenQuiz": [], "chosenQuestion": null})}
    handleImportShow = () => {this.setState({importShow: true})}

    onDeleteQuiz = (e) => {
      e.preventDefault();
      this.props.history.push('/');
    }

    getStarredQuizzes = () => {
      this.handleImportShow()
      axios.get('http://pi.cs.oswego.edu:9084/quizzes/course-starred-quizzes/' + this.state.courseID).then(res => {
        this.setState({starredQuizzes: res.data, gettingQuizzes: false})
      }).catch(err => {console.log(err)})
    }

    choseQuiz = (id) => {
      const foundQuiz = this.state.starredQuizzes.filter(item => {
        return item._id.$oid === id
      })
      this.setState ({chosenQuiz: foundQuiz})
    }

    choseQuestion = (id) => {
      const foundQuestion = this.state.chosenQuiz[0].quizQuestions[id]
      this.setState ({chosenQuestion: foundQuestion})
    }

    useQuestion = () => {
      this.setState({
        "question":this.state.chosenQuestion.question,
        "correct_answer":this.state.chosenQuestion.answer,
        "incorrect_answer1":this.state.chosenQuestion.incorrect_answers[0],
        "incorrect_answer2":this.state.chosenQuestion.incorrect_answers[1],
        "incorrect_answer3":this.state.chosenQuestion.incorrect_answers[2],
        "incorrect_answer4":this.state.chosenQuestion.incorrect_answers[3]
      })
      this.handleImportClose()
    }
      
    render(){
      const instructorButton = this.state.isInstructor ? (
        <> <Button id="dark-mode-button" variant="light" className="add-question-button rounded-corner" onClick={() => this.getStarredQuizzes()} style={{marginRight: '5px'}}> Import Questions </Button>
        <Button id="dark-mode-button" type="submit" variant="light" className="add-question-button rounded-corner">Add Question</Button> </>
      ):(
        <Button id="dark-mode-button" type="submit" variant="light" className="add-question-button rounded-corner">Add Question</Button> 
      )

      // FOR INSTRUCTOR - WHEN IMPORTING A QUESTION ------------------------
      const body = this.state.chosenQuiz.length ? (
        this.state.chosenQuestion!== null ? (
          <>
          <Style>
          <Card className="whole-question-card rounded-corner">
          <div style={{fontSize:"20px"}} className="small-spacer" dangerouslySetInnerHTML={{__html: this.state.chosenQuestion.question}}></div>
          <Form.Group>
          <Form.Row>
              <Form.Label className="label" column="lg" sm={0.5}> A </Form.Label>
              <Col><Form.Control className="correct-answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.answer}/></Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> B </Form.Label>
            <Col><Form.Control className="answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.incorrect_answers[0]}/></Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> C </Form.Label>
            <Col><Form.Control className="answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.incorrect_answers[1]}/></Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> D </Form.Label>
            <Col><Form.Control className="answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.incorrect_answers[2]}/></Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> E </Form.Label>
            <Col><Form.Control className="answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.incorrect_answers[3]}/></Col>
          </Form.Row>
          </Form.Group>
          </Card>
          </Style>
          </>
        ):(
          this.state.chosenQuiz[0].quizQuestions.map((question,i) => {
            return (
              <Card key={i} onClick={() => this.choseQuestion(i)}>
                <Card.Body>
                  <div style={{fontFamily: "Roboto", color: "#8F0047", fontSize: "20px"}}> Q{i+1} </div>
                  <div style={{fontFamily: "Roboto"}}> {question.question} </div>
                </Card.Body> 
              </Card>
            )
          })
        )
      ):(
        this.state.starredQuizzes.length ? (
          this.state.starredQuizzes.map((quiz,i) => {
            return (
              <Card key={i} onClick={() => this.choseQuiz(quiz._id.$oid)}>
                <Card.Body>
                <div style={{fontFamily: "Roboto", color: "#8F0047", fontSize: "20px"}}> {quiz.quizName} </div>
                <div style={{fontFamily: "Roboto"}}> {quiz.quizQuestions.length} questions </div> 
                </Card.Body>
              </Card>
            )
          })
        ): (
          this.state.gettingQuizzes ? (
            <div className="container-middle"><Spinner animation="border" variant="dark" /> Getting favorite quizzes...</div>
          ):(
            <span role="img" aria-label="No Starred Quizzes"> No starred quizzes in this course ✖ </span> 
          ) 
        )
      )
      // END --> FOR INSTRUCTOR - WHEN IMPORTING A QUESTION ------------------------

      const footerButtons = this.state.chosenQuestion===null ? (
        <Button id="dark-mode-button" variant="light" onClick={this.handleImportClose}> Cancel </Button>
      ):(
        <>
        <Button id="dark-mode-button" variant="light" onClick={this.handleImportClose}> Cancel </Button>
        <Button id="dark-mode-button" variant="light" onClick={() => this.useQuestion()}> Use Question </Button>
        </>
      )

      return (
        <Style>
        <div className="container-middle">
        <Form id="quiz-form" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Row>
          <Form.Control required id="form-input" className="header no-border" size="sm" type="text" placeholder="Quiz Title..." value={this.state.quiz_title} onChange={this.onQuizTitleChange.bind(this)}/>
          </Form.Row>

          <div className="spacer"></div>

          <div id="text" className="description"> {this.state.quiz_title} is about: 
            <span id="purple-text" className="topicsColor"> {this.state.topics.join(', ')}</span>.
            <Button variant="light" className="publish-quiz-button rounded-corner" onClick={this.onCreateQuiz}> Publish Quiz </Button>
            <Button variant="light" className="delete-quiz-button rounded-corner" onClick={this.handleShow}> Delete Quiz </Button> 
          </div>

          <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton> <Modal.Title> Delete Quiz </Modal.Title> </Modal.Header>
            <Modal.Body>Are you sure you want to discard this quiz?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}> Cancel </Button>
              <Button variant="primary" onClick={this.onDeleteQuiz}> Yes </Button>
            </Modal.Footer>
          </Modal>

          {/* <div className="small-spacer"> 
            <Button variant="light" className="add-topic-button rounded-corner"> Add Topic </Button> 
          </div> */}

          <div className="spacer"></div>

          <Card className="quiz-question rounded-corner">

          <div>
          <Form.Label className="description center" column="lg" lg={3}> Question {this.state.index + 1} </Form.Label>
          <Form.Row>
            <Form.Label style={{visibility: "hidden"}} column="lg" sm={0.5}> Q </Form.Label >
            <Col>
            <Form.Control required className="no-border" size="lg" type="text" placeholder="Click to write your question..." value={this.state.question} onChange={this.onQuestionChange.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>
          </div>
        
          <Form.Group>

          <Form.Row>
            <Form.Label id="correct-answer-label" className="label" column="lg" sm={0.5}> A </Form.Label >
            <Col>
            <Form.Control required className="correct-answer-field" size="lg" type="text" placeholder="Type your correct answer here..." value={this.state.correct_answer} onChange={this.onCorrect_answerChange.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> B </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer1} onChange={this.onIncorrect_answerChange1.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> C </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer2} onChange={this.onIncorrect_answerChange2.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> D </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer3} onChange={this.onIncorrect_answerChange3.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> E </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer4} onChange={this.onIncorrect_answerChange4.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          </Form.Group>
          </Card>

          <div className="small-spacer">  </div>
          <div className="button-group"> {instructorButton} </div>
          <div className="small-spacer"> </div>
          
          <Modal show={this.state.importShow} onHide={this.handleImportClose} backdrop="static">
            <Modal.Header closeButton> <Modal.Title> Import Quiz Question </Modal.Title> </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer> {footerButtons} </Modal.Footer>
          </Modal>

        </Form>
        </div>
        </Style>
      )
    }
  }

  export default withRouter(CreateQuizForm);