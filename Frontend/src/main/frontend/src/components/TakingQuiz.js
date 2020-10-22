import React, { Component } from 'react';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import Loading from './Loading';
import axios from 'axios';
import {Card, ProgressBar, Form, Col, Button} from 'react-bootstrap';
import { FcCheckmark, FcCancel } from "react-icons/fc"; //https://react-icons.github.io/react-icons/icons?name=fc
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"; //https://react-icons.github.io/react-icons/icons?name=ai

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
  }

  .answer-field-correct {
    background-color: #D4F6C3;
  }

  .answer-field-incorrect {
    background-color: #FBD9D9;
  }

  .next-question{
    float: right;
  }

  .next-question-button{
    float: right;
    background-color: #8F0047;
    color: white;
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
      "quizTitle": "Quiz Title", //placeholder change ""
      "currentQuestion": 0,
      "score": 0,
      "topics": ["Topic 1", "My Topic", "Another Topic"], //placeholder change []
      "isLoading": true,
      "showScore": false,
      "selectedID": "",
      "selected": false,
      "allAnswers": [],
      "setScore":[],
      "count":0,
      "vote":0, //the user’s current vote. 0 if no vote, -1 if downvoted, 1 if upvoted.
      "totalRating":0, //score of the post 
      "currentQuestionCounter":0
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  vote(type){ //type is either 1 for upvote or -1 for downvote;;;vote is a property of the state which describes the user's current vote: 0 = no vote; 1 = already upvoted; -1 already downvoted
    this.setState(state => ({
      vote: state.vote === type ? 0 : type
      // If the current vote is the same as the one we just passed in to the method, 
      //it means the user is undoing their vote and therefore it should be reset back to 0 to indicate they have no vote anymore. 
      //Otherwise, we should just set it to that value.
    }));
  }

  increment(){
    this.setState({count:this.state.count +1})
  }

  decrement(){
    this.setState({count:this.state.count -1})
  }

  componentDidMount () {
    this.mounted = true;
    axios.get('https://opentdb.com/api.php?amount=5&type=multiple').then(res => { //Get this from engine 
      if(this.mounted){
        this.setState({
          //quizTitle: res.data.title
          questions: res.data.results, //res.data.results
          //topics: res.data.results
          isLoading: false
        }, () => {
          console.log("Got data: ", this.state)
          this.setState({
            allAnswers: this.createRandom([...this.state.questions[this.state.currentQuestion].incorrect_answers, this.state.questions[this.state.currentQuestion].correct_answer])
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
    if (nextQuestion < this.state.questions.length) {
      this.setState({
        currentQuestion: nextQuestion, 
        selected: false, 
        selectedID:""}, () => {
          this.setState({
            allAnswers: this.createRandom([...this.state.questions[this.state.currentQuestion].incorrect_answers, this.state.questions[this.state.currentQuestion].correct_answer])
          })
        })
    } else {
      this.setState({showScore: true, selected: false, selectedID:""})
      //when the user is done taking a quiz, what are the request you want to us to make 
      //posts here
      //axios.post("url here") 
      //axios.put(`http://localhost:9081/users/add-course`, {
      //quiz id: this.state.id
      //quiz rating: this.state.totalRating;
      //})
    }
    this.setState({totalRating:this.state.totalRating + this.state.vote, vote:0})
  }

  handleAnswerClick = (chosenAnswer) => {
    this.setState({selectedID: chosenAnswer, selected: true})
    if (this.state.questions[this.state.currentQuestion].correct_answer === chosenAnswer) {
      this.setState({score: this.state.score + 1, setScore: [...this.state.setScore, true]})
      
    } else {
      this.setState({setScore:[...this.state.setScore, false]})
    }
  }

  doNothing () {}

  render() {
    if (this.state.isLoading) {return <div className="container-center"> <Loading type={'balls'} color={'#235937'}/> </div>}

    const answerLabels = ['A', 'B', 'C', 'D', 'E'];

    const questions = this.state.questions;
    const currentQuestion = this.state.currentQuestion;

    const currentPlace = ((currentQuestion+1)/questions.length) * 100;

    const allAnswers = this.state.allAnswers;

    const answersPlace = allAnswers.map((answer,i) => {
      return (
        <>
        <Form.Row key={i}>
            <Form.Label className="label" column="lg" sm={0.5}> {answerLabels[i]} </Form.Label >
            <Col>
            <Form.Control className={this.state.selected ? 
            ((answer === questions[currentQuestion].correct_answer) ? ("answer-field-correct"):(
              (answer === this.state.selectedID && answer !== questions[currentQuestion].correct_answer)?("answer-field-incorrect"):("answer-field"))
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

    const nextQuestionButton = this.state.selected ? (
      <Button variant="light" type="button" className="next-question-button" onClick={() => { this.goToNextQuestion()}}>Next Question</Button>
      ):(
        <h1 style={{visibility: "hidden"}}> hehe </h1>
      )


      const scoreTally = this.state.setScore.map((score,i) => {
        if (score) {
          return (<div style={{display:"inline-block", margin:"80px"}} key = {i} > Q{i+1}   <FcCheckmark style={{display:"inline-block", margin:"2px"}} className="correct-answer-icon"/> </div>)
        } else {
          return (<div style={{display:"inline-block", margin:"80px"}}  key = {i}> Q{i+1}  <FcCancel style={{display:"inline-block", margin:"2px"}} className="incorrect-answer-icon"/> </div>)
        }
        
      })
    
    const takingQuiz = this.state.showScore ? (
      <>
      <div className="subtitle">My Score</div>
      <Card className="score-card rounded-corner" >
      <h1 className="score-properties"> <span style={{color:"#1C9B2F", marginRight:"10px"}}>{this.state.score}</span> out of {questions.length} </h1>
      <div>{scoreTally}</div>
      <div style={{fontSize:"12px"}}>Total Rating of this quiz:{this.state.totalRating}</div>

      </Card>
      </>
    ):(
      <>
      <div className="spacer">{this.state.quizTitle} is about: <span className="topics"> {this.state.topics.join(', ')}. </span></div>
        <Card className="main-card rounded-corner">
          <ProgressBar variant="custom" now={currentPlace} label={`${currentPlace}%`} />
          <div className="small-spacer"></div>
          
          <Card className="whole-question-card rounded-corner">
            <h1 className="subtitle">Question {currentQuestion + 1}

            <h1>Total Rating {this.state.totalRating}</h1>
            <h2>Current {this.state.vote}</h2>
            <AiOutlineLike 
              style={{display:"inline-block", margin:"2px"}}
              id="upvote"
              className={this.state.vote === 1 ? "active-upvote" : undefined}
              onClick={() => this.vote(1)}>
              Upvote
            </AiOutlineLike>
            <AiOutlineDislike 
              style={{display:"inline-block", margin:"2px"}}
              id="downvote"
              className={this.state.vote === -1 ? "active-downvote" : undefined}
              onClick={() => this.vote(-1)}>
              Downvote
            </AiOutlineDislike>
            {/* <AiOutlineLike style={{display:"inline-block", margin:"2px"}} onClick={this.increment}/>
            <AiOutlineDislike style={{display:"inline-block", margin:"2px"}} onClick={this.decrement}/>   
            counter: {this.state.count} */}
            
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
      <div className="container">
        <h1 className="header">{this.state.quizTitle}</h1>
        {takingQuiz}
      </div>
      </Styles>
      </>
    )
  }
}

export default TakeQuiz;