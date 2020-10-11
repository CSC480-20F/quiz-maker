import React from 'react';
import TopNavbar from './TopNavbar';
// import styled from 'styled-components';
import axios from 'axios';
import { Card,Form, Col } from "react-bootstrap";


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

        

        state = {
            "quiz_title":"",
            "creator":window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),

            "courseID":"",
            "topic":[],

            "index":0,

            // "questions":[
            //   {question: "How?", 
            //   answer:"Idk", 
            //   incorrect_answers:{0: "the sun", 1:"the moon"}}, 
            //   {question: "Why?", 
            //   answer:"because", 
            //   incorrect_answers:{0: "wolf", 1:"vampire"}}
            // ],
            
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
            // this.setState({ 
            //     incorrect_answers: this.state.incorrect_answers.concat([this.state.incorrect_answer1, this.state.incorrect_answer2, this.state.incorrect_answer3])
            //)}
            console.log(this.state)
           
            this.setState({
                counter:this.state.index + 1
                
            })

            let a  = {...this.state.questions};//creates the clone of the state
            a[0] = {question: this.state.question, answer: this.state.answer, incorrect_answers: this.state.incorrect_answers}
            this.setState({questions: a});
            console.log(this.state.questions)
            this.setState({
              quiz_title:"",
              topic:"",
              question:"",
              correct_answers:"",
              incorrect_answer1:"",
              incorrect_answer2:"",
              incorrect_answer3:""
              
              

            })
            
            
          //   axios.post(`http://localhost:9081/users/testing-input`, {
          //   "quiz_title":this.state.quiz_title,
          //   "creator":this.state.creator,
          //   "courseID":this.state.courseID,
          //   "topic":this.state.topic,
          //   "question":this.state.question,
          //   "correct_answer":this.state.correct_answer,
          //   "incorrect_answers":[this.incorrect_answers]
          // })
          //   .then(res => {
          //     console.log(res);
          //     console.log(res.data);
          //   }).catch(error =>{
          //     console.log(error.response);
          //   })  
          }

          onQuizTitleChange(event) {
            this.setState({quiz_title: event.target.value})
          }

          onCreatorChange(event) {
            this.setState({creator: event.target.value})
          }

          onCourseIDChange(event) {
            this.setState({courseID: event.target.value})
          }

          onTopicChange(event) {
            this.setState({topic: event.target.value})
          }

          onQuestionChange(event) {
            this.setState({question: event.target.value})
          }

          onCorrect_answerChange(event){
            this.setState({correct_answer: event.target.value})
          }
          onIncorrect_answerChange1(event){

            let a = {...this.state.incorrect_answers};//creates the clone of the state
            a[0] = event.target.value;
            this.setState({incorrect_answers: a, incorrect_answer1:event.target.value});


            

            //this.setState({questions: a, question:event.target.value, answer:event.target.value, })
           //this.setState({incorrect_answer1: event.target.value
                
           // })

          }

          onIncorrect_answerChange2(event){
            let a = {...this.state.incorrect_answers};//creates the clone of the state
            a[1] = event.target.value;
            this.setState({incorrect_answers: a, incorrect_answer2:event.target.value});
            //this.setState({incorrect_answer2: event.target.value
            //})
          }

          onIncorrect_answerChange3(event){
            let a = {...this.state.incorrect_answers};//creates the clone of the state
            a[2] = event.target.value;
            this.setState({incorrect_answers: a, incorrect_answer3:event.target.value});
            //this.setState({incorrect_answer3: event.target.value
           // })
          }

          

        //   onIncorrect_answerChange(event){
        //       this.setState(prevState => ({
        //           incorrect_answers:[...prevState.incorrect_answers, event.target.value]
        //       }))
        //   }
      
  
    render(){
        return (
            <div> 
            <TopNavbar/>

            

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

            <Form.Row>
            <Form.Label column="sm" sm={0.1}>
            Topic:
            </Form.Label>
            <Col>
            <Form.Control size="sm" type="text" placeholder="Topic Here" value={this.state.topic} onChange={this.onTopicChange.bind(this)}/>
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
            <Form.Control size="lg" type="text" placeholder="Enter your question here..." value={this.state.question} onChange={this.onQuestionChange.bind(this)}/>
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
            <Form.Control size="lg" type="text" placeholder="Enter correct answer here" value={this.state.correct_answers} onChange={this.onCorrect_answerChange.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>
            
            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            B
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter an incorrect answer here" value={this.state.incorrect_answer1} onChange={this.onIncorrect_answerChange1.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>

            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            C
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter an incorrect answer here" value={this.state.incorrect_answer2} onChange={this.onIncorrect_answerChange2.bind(this)} />
            </Col>
            </Form.Row>
            <br/>
            
            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            D
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter an incorrect answer here" value={this.state.incorrect_answer3} onChange={this.onIncorrect_answerChange3.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>

            

            </Form.Group>
            {/* <button type="submit" className="btn btn-info">Click here to create another question</button> */}
            <button type="submit" className="btn btn-danger" style={{marginLeft:"200px"}}>Click here to submit this quiz</button>
            </Form>
            </Card>
            
            </h3>
            </div>   


        )
    }
  }

  export default CreateQuizForm;