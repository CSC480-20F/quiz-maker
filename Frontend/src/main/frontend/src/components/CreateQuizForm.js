import React from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import { Card,Form, Col } from "react-bootstrap";

// 💅 Stylesheet for this babay

// const Styles = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     padding-top: 100px;
//     background-color:;

// `;

// const Button = styled.button`
//     color: black;
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border: 2px solid palevioletred;
//     border-radius: 3px;
//     display: block;
// `;

// const Input = styled.input.attrs(props => ({
//     // we can define static props
//     type: "question",
  
//     // or we can define dynamic ones
//     size: props.size || "1em",
//   }))`
//     color: palevioletred;
//     font-size: 1em;
//     border: 2px solid palevioletred;
//     border-radius: 3px;
  
//     /* here we use the dynamically computed prop */
//     margin: ${props => props.size};
//     padding: ${props => props.size};
//   `;


class CreateQuizForm extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
      "quiz_title":"",
      "creator":window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
      "courseID":this.props.courseID,
      "topics":this.props.topics,
      "index":0,
      "question":"",
      "correct_answer":"",
      "incorrect_answer1":"",
      "incorrect_answer2":"",
      "incorrect_answer3":"",
      "incorrect_answers":[],
      "questions":[]
  }
        

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      incorrect_answers: [...this.state.incorrect_answers, this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3]
    }, () => {
      var obj = {question: this.state.question, answer: this.state.correct_answer, incorrect_answers: this.state.incorrect_answers};
      this.setState({
        questions: [...this.state.questions, obj],
        question:"",
        correct_answer:"",
        incorrect_answer1:"",
        incorrect_answer2:"",
        incorrect_answer3:"",
        incorrect_answers:[],
        index:this.state.index + 1
      }, () => {
        console.log("after updating state: ", this.state);
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

    onCreateQuiz = (e) => {
      e.preventDefault();
      console.log(this.state);
      axios.post(`http://localhost:9084/quizzes/testing-input`, {
        "quizName":this.state.quiz_title,
        "creator":this.state.creator,
        "courseID":this.state.courseID,
        "quizTopics":this.state.topics,
        "quizQuestions":this.state.questions
      })
      .then(res => {
        this.setState ({
          "quiz_title":"",
          "topic":"",
          "index":0
        })
        window.alert("Quiz Posted! 🥳 ");
        console.log(res);
        console.log(res.data);
      }).catch(error =>{
        window.alert("Problem posting the Quiz 😞" );
        console.log(error);
      })  
    }
      
    render(){
      return (
        <div> 
        
        <h3 style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="container">
        
        <Card style={{ width: '50rem', padding:'35px' }} className='rounded-corner'>
      
        <Form id="quiz-form" onSubmit={this.handleSubmit.bind(this)}>
        
        <Form.Row>
          <Form.Label column="sm" sm={0.1}>
          Quiz Title:
          </Form.Label>
          <Col>
          <Form.Control size="sm" type="text" placeholder="Quiz Title..." value={this.state.quiz_title} onChange={this.onQuizTitleChange.bind(this)}/>
          </Col>
        </Form.Row>
        <br/>
        

        <div>
        <Form.Label  column="lg" lg={3}>
        Question {this.state.index + 1}
        </Form.Label>
        
        <Form.Row>
          <Form.Label style={{visibility: "hidden"}} column="lg" sm={0.1}>
          Q
          </Form.Label >
          <Col>
          <Form.Control size="lg" type="text" placeholder="Type your question..." value={this.state.question} onChange={this.onQuestionChange.bind(this)}/>
          </Col>
        </Form.Row>
        <br/>
        </div>
        
        <Form.Group>
        <Form.Row>
          <Form.Label column="lg" sm={0.1}>
          A
          </Form.Label >
          <Col>
          <Form.Control size="lg" type="text" placeholder="Type your correct answer here..." value={this.state.correct_answer} onChange={this.onCorrect_answerChange.bind(this)}/>
          </Col>
        </Form.Row>
        <br/>
        
        <Form.Row>
          <Form.Label column="lg" sm={0.1}>
          B
          </Form.Label>
          <Col>
          <Form.Control size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer1} onChange={this.onIncorrect_answerChange1.bind(this)}/>
          </Col>
        </Form.Row>
        <br/>

        <Form.Row>
          <Form.Label column="lg" sm={0.1}>
          C
          </Form.Label>
          <Col>
          <Form.Control size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer2} onChange={this.onIncorrect_answerChange2.bind(this)} />
          </Col>
        </Form.Row>
        <br/>
        
        <Form.Row>
          <Form.Label column="lg" sm={0.1}>
          D
          </Form.Label>
          <Col>
          <Form.Control size="lg" type="text" placeholder="Type an incorrect answer here..." value={this.state.incorrect_answer3} onChange={this.onIncorrect_answerChange3.bind(this)}/>
          </Col>
        </Form.Row>
        <br/>

        

        </Form.Group>
        <button type="submit" className="btn btn-warning" style={{marginLeft:"200px"}}>Add Another Question</button>
        </Form>

        <Form.Group>
        <button className="btn btn-danger" onClick={this.onCreateQuiz}> Create Quiz </button>
        </Form.Group>
        </Card>
        
        </h3>
        </div>   
      )
    }
  }

  export default CreateQuizForm;