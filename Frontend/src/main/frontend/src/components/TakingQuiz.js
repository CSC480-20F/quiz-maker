import React, { Component } from 'react';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import Loading from './Loading';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Card, ProgressBar, Form, Col, Button, Modal, } from 'react-bootstrap';
import { FcCheckmark, FcCancel } from "react-icons/fc"; //https://react-icons.github.io/react-icons/icons?name=fc
import { AiOutlineLike, AiOutlineDislike, AiTwotoneFlag } from "react-icons/ai"; //https://react-icons.github.io/react-icons/icons?name=ai

const Styles = styled.div`
  .topics {
    color: #8F0047;
  }

  .container {
    font-family: Roboto;
  }

  .progress {
    border-radius: 40px;
  }

  .progress-bar { 
    background-color: #8F0047;
    color: white;
  }

  .main-card {
    padding: 15px 40px 15px 40px;
    box-shadow: 0 3px 3px 0 #ECECEC, 0 6px 6px 0 #ECECEC;
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
    cursor: pointer !important;
  }

  .answer-field-correct {
    background-color: #D4F6C3;
    cursor: pointer !important;
  }

  .answer-field-incorrect {
    background-color: #FBD9D9;
    cursor: pointer !important;
  }

  .next-question{
    float: right;
  }

  .next-question-button{
    float: right;
    background-color: #8F0047;
    color: white;
  }

  .back-course-button {
    background-color: #8F0047;
    color: white;
    min-width: 20%;
    max-width: 25%;
    align-self: center;
    border-radius: 20px;
  }

  .score-card{
    padding: 50px;
    font-size: 50px;

  }

  .score-properties{
    font-size: 50px;
    display: flex;
    justify-content: center;
  }

  .correct-answer{
   float: left;
  
  }

  .incorrect-answer{
    float: left;
  }

  .active-upvote{
    color:#37bf84;
  }

  .active-downvote{
    color:red;
  }

`;

class TakeQuiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      "questions": [],
      "courseID": "",
      "quizTitle": "",
      "currentQuestion": 0,
      "score": 0,
      "topics": [""],
      "isLoading": true,
      "showScore": false,
      "selectedID": "",
      "selected": false,
      "allAnswers": [],
      "setScore":[],
      "count":0,
      "vote":0, //the user’s current vote. 0 if no vote, -1 if downvoted, 1 if upvoted.
      "totalRating":0, //score of the post 
      "currentQuestionCounter":0,
      "show":false,
      "isStarred": null,
      "report_form":"",
      "scoreLoading": true,
      "isInstructor": false,
      "student": window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
      "teacher":""
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  vote(type){ //type is either 1 for upvote or -1 for downvote;;;vote is a property of the state which describes the user's current vote: 0 = no vote; 1 = already upvoted; -1 already downvoted
    this.setState(state => ({
      vote: state.vote === type ? 0 : type
    }));
  }

  increment(){
    this.setState({count:this.state.count +1})
  }

  decrement(){
    this.setState({count:this.state.count -1})
  }

  handleClose = () => {
    this.setState({show: false})
  }
  handleShow = () => {
    this.setState({show: true})
  }

  onReportSubmit = (e) => {
    e.preventDefault();
    let checked = ""
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
      if (!checked.length > 0) {
        checked = checked.concat(" " + checkboxes[i].id)
      } else {
        checked = checked.concat(", " + checkboxes[i].id)
      }
    }
    const teacher = this.state.teacher
    console.log(teacher)
    let body = `Reporting Question ${this.state.currentQuestion + 1} for the quiz titled ${this.state.quizTitle}. Reporting for the following reasons: ${checked}.`
    if (this.state.report_form.length > 0) {
      body = body.concat(` Other reason includes: ${this.state.report_form}`)
    }
    const subject = "Reporting Question"
    window.open(`mailto:${teacher}?subject=${subject}&body=${body}`); //problem is that anytime button window.open 
    this.setState({"report_form":""})
    this.handleClose()
  }

  onReportChange(event) {this.setState({report_form: event.target.value})}



  componentDidMount () {
    this.mounted = true;
    let id = this.props.match.params.quiz_id;
    axios.get('http://pi.cs.oswego.edu:9084/quizzes/get-quiz/' + id).then(res => {
      if(this.mounted){
        this.setState({
          quizTitle: res.data.quizName,
          courseID: res.data.courseID,
          questions: res.data.quizQuestions,
          topics: res.data.quizTopics,
          isStarred: res.data.starred,
          isLoading: false
        }, () => {
          this.checkIfInstructor()
          this.setState({
            allAnswers: this.createRandom([...this.state.questions[this.state.currentQuestion].incorrect_answers, this.state.questions[this.state.currentQuestion].answer])
          })
        })
      }
    }).catch(err => {
      console.log(err);
      if (this.mounted) {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  createRandom = (arr) => {
    let myArr = [...arr];
    let randomizedArr = [];
    while (myArr.length > 0) {
       var randomIndex = Math.floor(Math.random() * myArr.length);
       randomizedArr.push(myArr[randomIndex]);
       myArr.splice(randomIndex, 1);
    }
    return randomizedArr;
  }

  goToNextQuestion = () => {
    const nextQuestion = this.state.currentQuestion + 1;
    this.setState({totalRating: this.state.totalRating + this.state.vote, vote:0})
    if (nextQuestion < this.state.questions.length) {
      this.setState({
        currentQuestion: nextQuestion, 
        selected: false, 
        selectedID:""}, () => {
          this.setState({
            allAnswers: this.createRandom([...this.state.questions[this.state.currentQuestion].incorrect_answers, this.state.questions[this.state.currentQuestion].answer])
          })
        })
    } else {
      this.setState({showScore: true, selected: false, selectedID:""})
      axios.put(`http://pi.cs.oswego.edu:9081/users/quizzes-taken`, {
        "id": this.props.match.params.quiz_id,
        "email": window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
      }).then(res => {
        this.sendRatingToDB();
      }).catch(error =>{
        console.log(error);
      })
    }
  }

  sendRatingToDB = () => {
    axios.put(`http://pi.cs.oswego.edu:9084/quizzes/update-rating`, {
        "id": this.props.match.params.quiz_id,
        "rating": this.state.totalRating
      }).then(res => {
        this.setState({scoreLoading: false})
      }).catch(error =>{console.log(error); this.setState({scoreLoading: false})})
  }

  checkIfInstructor = () => {
    const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
    axios.get('http://pi.cs.oswego.edu:9083/courses/get-courses/' + this.state.courseID).then(res => {
      this.setState({teacher:res.data[0].teacher})
      if (email === res.data[0].teacher) {
        this.setState({isInstructor: true})
      }
    }).catch(err => {console.log(err)})
  }

  goBackToCourse = () => {
    this.props.history.push('/Courses/' + this.state.courseID);
  }

  handleAnswerClick = (chosenAnswer) => {
    this.setState({selectedID: chosenAnswer, selected: true})
    if (this.state.questions[this.state.currentQuestion].answer === chosenAnswer) {
      this.setState({score: this.state.score + 1, setScore: [...this.state.setScore, true]})
      
    } else {
      this.setState({setScore:[...this.state.setScore, false]})
    }
  }

  starQuiz = () => {
    axios.put(`http://pi.cs.oswego.edu:9084/quizzes/update-star`, {
        "id" : this.props.match.params.quiz_id
      }).then(res => {
        NotificationManager.success('Quiz favorite status changed! 🥳', 'Favorite Changed', 4000);
        document.getElementById("star-button").style.visibility="hidden";
      }).catch(error =>{
        NotificationManager.success('Problem starring the Quiz 😞', 'Error', 4000);
        console.log(error);
      })
  }

  doNothing () {}

  render() {
    if (this.state.isLoading) {return <div className="container-center"> <Loading type={'spin'} color={'#235937'}/> </div>}

    const answerLabels = ['A', 'B', 'C', 'D', 'E'];

    const questions = this.state.questions;
    const currentQuestion = this.state.currentQuestion;

    const currentPlace = Math.round(((currentQuestion+1)/questions.length) * 100);

    const allAnswers = this.state.allAnswers;

    const answersPlace = allAnswers.map((answer,i) => {
      return (
        <>
        <Form.Row key={i}>
            <Form.Label className="label" column="lg" sm={0.5}> {answerLabels[i]} </Form.Label>
            <Col>
            <Form.Control className={this.state.selected ? 
            ((answer === questions[currentQuestion].answer) ? ("answer-field-correct"):(
              (answer === this.state.selectedID && answer !== questions[currentQuestion].answer)?("answer-field-incorrect"):("answer-field"))
            ):(
              "answer-field"
            )}
            size="lg" type="text" readOnly value={answer} onClick={this.state.selected ? (this.doNothing()): (e => this.handleAnswerClick(e.target.value))}/>
            </Col>
          </Form.Row>
          <br/>
        </>
      )
    })

    const scoreQuestions = this.state.questions.map((question,i) => {
      return (
        <>
        <Card className="whole-question-card rounded-corner" key={i}>
        <h1 className="this-subtitle">
          Question {i+1} 
        </h1>
        <div style={{fontSize:"20px"}} className="small-spacer" dangerouslySetInnerHTML={{__html: question.question}}></div>
        <Form.Group>
        <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> A </Form.Label>
            <Col>
            <Form.Control className="answer-field-correct"

            size="lg" type="text" readOnly value={question.answer}/>
            </Col>
          </Form.Row>


          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> B </Form.Label>
            <Col>
            <Form.Control className="answer-field"

            size="lg" type="text" readOnly value={question.incorrect_answers[0]}/>
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> C </Form.Label>
            <Col>
            <Form.Control className="answer-field"

            size="lg" type="text" readOnly value={question.incorrect_answers[1]}/>
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> D </Form.Label>
            <Col>
            <Form.Control className="answer-field"

            size="lg" type="text" readOnly value={question.incorrect_answers[2]}/>
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Label className="label" column="lg" sm={0.5}> E </Form.Label>
            <Col>
            <Form.Control className="answer-field"

            size="lg" type="text" readOnly value={question.incorrect_answers[3]}/>
            </Col>
          </Form.Row>

          </Form.Group>
          </Card>
          <div className="small-spacer"></div>
        </>
      )
    })

    const nextQuestionButton = this.state.selected ? (
      <Button variant="light" type="button" className="next-question-button" onClick={() => { this.goToNextQuestion()}}>Next Question</Button>
      ):(
        <h1 style={{visibility: "hidden"}}> hehe </h1>
      )


      const scoreTally = this.state.setScore.map((score,i) => {
        if (score) {
          return (<div style={{display:"inline-block", margin:"25px", textAlign: "center"}} key = {i} > Q{i+1}   <FcCheckmark style={{display:"inline-block", margin:"2px"}} className="correct-answer-icon"/> </div>)
        } else {
          return (<div style={{display:"inline-block", margin:"25px", textAlign: "center"}}  key = {i}> Q{i+1}  <FcCancel style={{display:"inline-block", margin:"2px"}} className="incorrect-answer-icon"/> </div>)
        }
        
      })
      
    const endButtons = this.state.isInstructor ? (
      this.state.isStarred ? ( <>
        <Button id="star-button" variant="light" type="button" className="back-course-button" onClick={() => { this.starQuiz()}}>Un-favorite Quiz</Button>
        <Button variant="light" type="button" className="back-course-button" onClick={() => { this.goBackToCourse()}}>Back to Course</Button> </>
      ):( <>
        <Button id="star-button" variant="light" type="button" className="back-course-button" onClick={() => { this.starQuiz()}}>Favorite Quiz</Button>
        <Button variant="light" type="button" className="back-course-button" onClick={() => { this.goBackToCourse()}}>Back to Course</Button> </>
      )
    ):(
      <Button variant="light" type="button" className="back-course-button" onClick={() => { this.goBackToCourse()}}>Back to Course</Button>
    )

    const takingQuiz = this.state.showScore ? (
      this.state.scoreLoading ? (
        <div className="container-center"><Loading type={'spin'} color={'#235937'}/></div>
      ):(
        <>
        <div className="subtitle">My Score</div>
        <Card className="score-card rounded-corner" >
        <h1 className="score-properties"> <span style={{color:"#1C9B2F", marginRight:"10px"}}>{this.state.score}</span> out of {questions.length} </h1>
        <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>{scoreTally}</div>
        
        {endButtons}

        </Card>

        <div className="small-spacer"></div>
      
        <Card  className="score-card rounded-corner" >
        
        {scoreQuestions}
        </Card>
        
        
        </>
      )
    ):(
      <>
      <div id="taking-quiz-topic" className="spacer">{this.state.quizTitle} is about: <span id="purple-text" className="topics"> {this.state.topics.join(', ')}. </span></div>
        <Card className="main-card rounded-corner">
          <ProgressBar variant="custom" now={currentPlace} label={`${currentPlace}%`} />
          <div className="small-spacer"></div>
          
          <Card className="whole-question-card rounded-corner">
            <h1 className="this-subtitle">Question {currentQuestion + 1}

            <AiOutlineLike 
              style={{display:"inline-block", margin:"2px", cursor:'pointer'}}
              id="upvote"
              className={this.state.vote === 1 ? "active-upvote" : undefined}
              onClick={() => this.vote(1)}>
              Upvote
            </AiOutlineLike>
            <AiOutlineDislike 
              style={{display:"inline-block", margin:"2px", cursor:'pointer'}}
              id="downvote"
              className={this.state.vote === -1 ? "active-downvote" : undefined}
              onClick={() => this.vote(-1)}>
              Downvote
            </AiOutlineDislike>

            <AiTwotoneFlag onClick={this.handleShow} style={{cursor:'pointer', display:"inline-block", margin:"2px", float: "right"}}  > </AiTwotoneFlag>
            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">

            <Form id="report-form" onSubmit={this.onReportSubmit.bind(this)}>

            <Modal.Header closeButton> <Modal.Title> Report </Modal.Title> </Modal.Header>

            <Modal.Body>What is the problem?        

            {['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">

              <Form.Check type={type} id={`Spelling Mistake`} label={`Spelling Mistake`}/>

              <Form.Check type={type} id={`Wrong Question`} label={`Wrong Question `}/>

              <Form.Check type={type} id={`Wrong Answer`} label={`Wrong Answer`}/>

              </div>
            ))}


            <Form.Row>
            <Form.Control  className="no-border" size="sm" type="text" placeholder="If other please specify" 
            value={this.state.report_form} onChange={this.onReportChange.bind(this)}/>
            </Form.Row>

            </Modal.Body>

            <Modal.Footer> <Button variant="primary" type="submit"> Submit </Button> </Modal.Footer>

            </Form>
            </Modal>

            </h1>

            <div className="small-spacer" dangerouslySetInnerHTML={{__html: questions[currentQuestion].question}}></div>
            <Form.Group>
            {answersPlace}
            </Form.Group>

          </Card>
          <div className="small-spacer"></div>
          <div className="next-question">{nextQuestionButton} </div>
        </Card>
      </>
    )

    return (
      <>
      <TopNavbar/>
      <Styles>
      <div className="container" >
        <h1 id="taking-quiz-title" className="header">{this.state.quizTitle}</h1>
        {takingQuiz}
      </div>
      </Styles>
      </>
    )
  }
}

export default TakeQuiz;