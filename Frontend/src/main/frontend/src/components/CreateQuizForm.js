import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Modal, Button, Card, Form, Col, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import TopNavbar from './TopNavbar';


// 💅 Stylesheet for this babay
const Style = styled.div`
    .edit {
      max-height: 20%;
    }

    .header {
      background-color:white;
      margin-top: 15px;
      border-radius: 15px;
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
      min-width: 15%;
      margin:10px;
    }

    .quiz-question {
      padding: 20px 50px 20px 50px;
      min-width: 70rem;
      max-width: 80rem;
    }

    .button-group {
      text-align: center;
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
      font-weight: bolder;
    }

    .next-button{
      float: right;
      background-color: #8F0047;
      font-family: Roboto;
      color: white;
      max-width: fit-content;
    }

    .prev-button{
      float: left;
      background-color: #8F0047;
      font-family: Roboto;
      color: white;
      max-width: fit-content;
    }

    .topOfQuiz {
      margin-top: 30px;
    }
`;


class CreateQuizForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "quiz_title":"",
      "creator":window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
      // "isInstructor": this.props.professor,
      // "courseID":this.props.courseID,
      // "topics":this.props.topics,
      "isInstructor": "npayag@oswego.edu",
      "courseID":1234,
      "topics":["Killing", "Myself"],
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
      "starredQuizzes": [{
        "_id": {
          "$oid": "5fa3247b2a71540c8786ae9e"
        },
        "quizName": "Just some basic math",
        "creator": "jdoe@oswego.edu",
        "courseID": "5fa3222f4302427409239bed",
        "quizTopics": [
          "Algebra",
          "Percentages",
          "Fractions"
        ],
        "quizQuestions": [
          {
            "question": "4 + ? = 20",
            "answer": "16",
            "incorrect_answers": [
              "15",
              "14",
              "17",
              "12"
            ]
          },
          {
            "question": "What is 9 ÷ 3? ",
            "answer": "3",
            "incorrect_answers": [
              "3,5",
              "1/2",
              "4",
              "2,5"
            ]
          },
          {
            "question": " Which percent equals 1/4? ",
            "answer": "25%",
            "incorrect_answers": [
              "14%",
              "41%",
              "52%",
              "None of the above"
            ]
          },
          {
            "question": "Convert 75 minutes to days.",
            "answer": "0.052 days",
            "incorrect_answers": [
              "0.061 days",
              "0.054 days",
              "0.03 days",
              "0.075 days"
            ]
          }
        ],
        "rating": 7,
        "starred": true
      },
      {
        "_id": {
          "$oid": "5fa325d02a71540c8786aec7"
        },
        "quizName": "Fun multiplications!",
        "creator": "sandy@oswego.edu",
        "courseID": "5fa3222f4302427409239bed",
        "quizTopics": [
          "Multiplication"
        ],
        "quizQuestions": [
          {
            "question": "5x6?",
            "answer": "30",
            "incorrect_answers": [
              "40",
              "28",
              "35",
              "24"
            ]
          },
          {
            "question": "2 x 4.256",
            "answer": "8.512",
            "incorrect_answers": [
              "4.235",
              "8.1232",
              "8.912",
              "8.012"
            ]
          },
          {
            "question": "3x9?",
            "answer": "27",
            "incorrect_answers": [
              "42",
              "30",
              "24",
              "18"
            ]
          },
          {
            "question": "92 x 4320",
            "answer": "397,440",
            "incorrect_answers": [
              "424,440",
              "123,440",
              "625,440",
              "823,440"
            ]
          }
        ],
        "rating": 7,
        "starred": true
      }],
      // "gettingQuizzes": true
      "gettingQuizzes": false
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

    onQuizTitleChange(event) { this.setState({quiz_title: event.target.value})}

    onQuestionChange(event) {this.setState({question: event.target.value})}

    onCorrect_answerChange(event){this.setState({correct_answer: event.target.value})}

    onIncorrect_answerChange1(event){this.setState({incorrect_answer1:event.target.value});}

    onIncorrect_answerChange2(event){this.setState({incorrect_answer2:event.target.value});}

    onIncorrect_answerChange3(event){this.setState({incorrect_answer3:event.target.value});}

    onIncorrect_answerChange4(event){this.setState({incorrect_answer4:event.target.value});}

    postQuizToDB = () => {
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

    onCreateQuiz = (e) => {
      e.preventDefault();
      if (this.state.question.length > 0 && this.state.correct_answer.length > 0 && this.state.incorrect_answer1.length > 0 && this.state.incorrect_answer2.length > 0 && this.state.incorrect_answer3.length > 0 && this.state.incorrect_answer4.length > 0) {
        this.setState({
          incorrect_answers: [...this.state.incorrect_answers, this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3, this.state.incorrect_answer4]
        }, () => {
          var obj = {question: this.state.question, answer: this.state.correct_answer, incorrect_answers: this.state.incorrect_answers};
          this.setState({questions: [...this.state.questions, obj]}, () => {this.postQuizToDB()});
        })
      } else {
        if (this.state.questions.length === 0) {
          NotificationManager.info('You need to add at least one question! 😅', 'Question Needed', 4000);
          return; 
        }
        this.postQuizToDB();
      }
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
      // axios.get('http://pi.cs.oswego.edu:9084/quizzes/course-starred-quizzes/' + this.state.courseID).then(res => {
      //   this.setState({starredQuizzes: res.data, gettingQuizzes: false})
      // }).catch(err => {console.log(err)})
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

    displayCurrentQuestion = () => {
      this.setState({
        "question":this.state.questions[this.state.index].question,
        "correct_answer":this.state.questions[this.state.index].answer,
        "incorrect_answer1":this.state.questions[this.state.index].incorrect_answers[0],
        "incorrect_answer2":this.state.questions[this.state.index].incorrect_answers[1],
        "incorrect_answer3":this.state.questions[this.state.index].incorrect_answers[2],
        "incorrect_answer4":this.state.questions[this.state.index].incorrect_answers[3]
      })
    }

    prevQuestion = () => {
      if (this.state.index < this.state.questions.length) {
        if (this.state.question.length < 1 || this.state.correct_answer.length < 1 || this.state.incorrect_answer1.length < 1 || this.state.incorrect_answer2.length < 1 || this.state.incorrect_answer3.length < 1 || this.state.incorrect_answer4.length < 1) {
          NotificationManager.info('Make sure all the fields are filled in! 🧐 ', 'Fill in fields', 4000);
          return;
        }
        this.setState({
          incorrect_answers: [...this.state.incorrect_answers, this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3, this.state.incorrect_answer4]
        }, () => {
          var obj = {question: this.state.question, answer: this.state.correct_answer, incorrect_answers: this.state.incorrect_answers};
          let temp = this.state.questions.slice(); //creates the clone of the state
          temp[this.state.index] = obj;
          this.setState({
            questions: temp,
            incorrect_answers: []
          }, ()=> {
            this.setState({index: this.state.index - 1}, () => {
              this.displayCurrentQuestion()
            })
          })
        })
      } else {
        this.setState({index: this.state.index - 1}, () => {
          this.displayCurrentQuestion()
        })
      }
    }

    nextQuestion = () => {
      if (this.state.question.length < 1 || this.state.correct_answer.length < 1 || this.state.incorrect_answer1.length < 1 || this.state.incorrect_answer2.length < 1 || this.state.incorrect_answer3.length < 1 || this.state.incorrect_answer4.length < 1) {
        NotificationManager.info('Make sure all the fields are filled in! 🧐 ', 'Fill in fields', 4000);
        return;
      }
      this.setState({
        incorrect_answers: [...this.state.incorrect_answers, this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3, this.state.incorrect_answer4]
      }, () => {
        var obj = {question: this.state.question, answer: this.state.correct_answer, incorrect_answers: this.state.incorrect_answers};
        let temp = this.state.questions.slice(); //creates the clone of the state
        temp[this.state.index] = obj;
        this.setState({
          questions: temp,
          incorrect_answers: []
        }, ()=> {
          this.setState({ index: this.state.index + 1}, () => {
            if (this.state.questions.length > this.state.index) {
              this.displayCurrentQuestion()
            } else {
              this.setState({
                "question":"",
                "correct_answer":"",
                "incorrect_answer1":"",
                "incorrect_answer2":"",
                "incorrect_answer3":"",
                "incorrect_answer4":""
              })
            }
          })
        })
      })
    }
      
    render(){
      const instructorButton = this.state.isInstructor ? (
        <> 
        <Button id="dark-mode-button" variant="light" className="add-question-button rounded-corner" onClick={() => this.getStarredQuizzes()} style={{marginRight: '5px'}}> Import Questions </Button>
        <Button id="dark-mode-button" type="submit" variant="light" className="add-question-button rounded-corner">Add This Question</Button> </>
      ):(
        <Button id="dark-mode-button" type="submit" variant="light" className="add-question-button rounded-corner">Add This Question</Button> 
        
      )

      const prevButton = this.state.index > 0 ? (
        <Button id="dark-mode-button" className="prev-button rounded-corner" onClick={() => this.prevQuestion()} variant="light"> Previous Question </Button>
      ):(
        <> </>
      )
      
      const nextButton = this.state.index < this.state.questions.length ? (
        <Button id="dark-mode-button" className="next-button rounded-corner" onClick={() => this.nextQuestion()} variant="light"> Next Question </Button>
      ):(
        <> </>
      )

      const changeIndexButtons = this.state.questions.length > 0 ? (
        <> {prevButton} {nextButton} </>
      ):(
        <> </>
      )

      // FOR INSTRUCTOR - WHEN IMPORTING A QUESTION ---------------------------
      const body = this.state.chosenQuiz.length ? (
        this.state.chosenQuestion!== null ? (
          <>
          <Style>
          <Card className="whole-question-card rounded-corner">
          <div style={{fontSize:"20px"}} className="small-spacer" dangerouslySetInnerHTML={{__html: this.state.chosenQuestion.question}}></div>
          <Form.Group>
          <Form.Row>
              <Form.Label className="label" column="lg" sm={0.5}> A </Form.Label>
              <Col><Form.Control className="answer-field correct-answer-field" size="lg" type="text" readOnly value={this.state.chosenQuestion.answer}/></Col>
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
        <>
        
        <Style>
        <TopNavbar />
        <div className="container-middle">
        <Form id="quiz-form" onSubmit={this.handleSubmit.bind(this)}>
          {/* <Form.Row>
          <Form.Control required id="form-input" className="header no-border" size="sm" type="text" placeholder="Type Quiz Title Here..." value={this.state.quiz_title} onChange={this.onQuizTitleChange.bind(this)}/>
          </Form.Row>

          <div className="spacer"></div> */}

          <div id="text" className="description topOfQuiz"> {this.state.quiz_title} is about: 
            <span id="purple-text" className="topicsColor"> {this.state.topics.join(', ')}</span>.
            <Button variant="light" className="publish-quiz-button rounded-corner" onClick={this.onCreateQuiz}> Publish Quiz </Button>
            <Button variant="light" className="delete-quiz-button rounded-corner" onClick={this.handleShow}> Delete Quiz </Button> 
          </div>

          <div className="spacer"></div>

          <Form.Row>
          <Form.Control required id="form-input" className="header no-border" size="sm" type="text" placeholder="Type Quiz Title Here..." value={this.state.quiz_title} onChange={this.onQuizTitleChange.bind(this)}/>
          </Form.Row>

          <div className="small-spacer"></div>
          
          <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton> <Modal.Title> Delete Quiz </Modal.Title> </Modal.Header>
            <Modal.Body>Are you sure you want to discard this quiz?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}> Cancel </Button>
              <Button variant="primary" onClick={this.onDeleteQuiz}> Yes </Button>
            </Modal.Footer>
          </Modal>

          <Card className="quiz-question rounded-corner">

          <div>
          <Form.Label className="description center" column="lg" lg={3}> Question {this.state.index + 1}  {instructorButton} </Form.Label>
          {/* <div style={{float:'left'}}> {instructorButton} </div> */}
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
            <Form.Label id="correct-answer-field" className="label" column="lg" sm={0.5}> A </Form.Label >
            <Col>
            <Form.Control required className="answer-field correct-answer-field" size="lg" type="text" placeholder="Type your correct answer here..." value={this.state.correct_answer} onChange={this.onCorrect_answerChange.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> B </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Incorrect answer here..." value={this.state.incorrect_answer1} onChange={this.onIncorrect_answerChange1.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> C </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Incorrect answer here..." value={this.state.incorrect_answer2} onChange={this.onIncorrect_answerChange2.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> D </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Incorrect answer here..." value={this.state.incorrect_answer3} onChange={this.onIncorrect_answerChange3.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> E </Form.Label >
            <Col>
            <Form.Control required className="answer-field" size="lg" type="text" placeholder="Incorrect answer here..." value={this.state.incorrect_answer4} onChange={this.onIncorrect_answerChange4.bind(this)}/>
            </Col>
          </Form.Row>
          <br/>

          </Form.Group>
          <div> {changeIndexButtons} </div>
          {/* <Button id="dark-mode-button" type="submit" variant="light" className="add-question-button rounded-corner">Add This Question</Button>  */}
          </Card>

          <div className="small-spacer">  </div>
          
          <div className="small-spacer"> </div>
          
          <Modal show={this.state.importShow} onHide={this.handleImportClose} backdrop="static">
            <Modal.Header closeButton> <Modal.Title> Import Quiz Question </Modal.Title> </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer> {footerButtons} </Modal.Footer>
          </Modal>

        </Form>
        </div>
        </Style>
        </>
        )
    }
  }

  export default withRouter(CreateQuizForm);