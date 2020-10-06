import React from 'react';
import TopNavbar from './TopNavbar';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Card,Form, Col } from "react-bootstrap";

const Styles = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    background-color:;

`;

// const Button = styled.button`
//     color: black;
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border: 2px solid palevioletred;
//     border-radius: 3px;
//     display: block;
// `;

const Input = styled.input.attrs(props => ({
    // we can define static props
    type: "question",
  
    // or we can define dynamic ones
    size: props.size || "1em",
  }))`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  
    /* here we use the dynamically computed prop */
    margin: ${props => props.size};
    padding: ${props => props.size};
  `;


  class CreateQuizForm extends React.Component{

        state = {
            "question":"",
            "correct_answer":"",
            "incorrect_answers":[]

        }


        handleSubmit(e) {
            e.preventDefault();
        axios.post(`http://localhost:9081/users/testing-input`, {
            "question":this.state.question,
            "correct_answer":this.state.correct_answer,
            "incorrect_answers":[this.incorrect_answers]
          })
            .then(res => {
              console.log(res);
              console.log(res.data);
            }).catch(error =>{
              console.log(error.response);
            })  
          }

          onQuestionChange(event) {
            this.setState({question: event.target.value})
          }

          onCorrect_answerChange(event){
            this.setState({correct_answer: event.target.value})
          }
          onIncorrect_answerNameChange(event){
            this.setState({incorrect_answers: event.target.value})
          }
      
    

    render(){
        return (
            <div> 
            <TopNavbar/>

            <h3 style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="container">
            
            <Card style={{ width: '50rem', padding:'35px' }} className='rounded-corner'>
            <Form id="quiz-form" onSubmit={this.handleSubmit.bind(this)}>
            
            <div>
            <Form.Label  column="lg" lg={3}>
            Question 1
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
            <Form.Control size="lg" type="text" placeholder="Enter your answer here" value={this.state.correct_answer} onChange={this.onCorrect_answerChange.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>
            
            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            B
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter your answer here" value={[this.state.incorrect_answers]} onChange={this.onIncorrect_answerNameChange.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>

            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            C
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter your answer here" value={[this.state.incorrect_answers]} onChange={this.onIncorrect_answerNameChange.bind(this)} />
            </Col>
            </Form.Row>
            <br/>
            
            <Form.Row>
            <Form.Label column="lg" sm={0.1}>
            D
            </Form.Label>
            <Col>
            <Form.Control size="lg" type="text" placeholder="Enter your answer here" value={[this.state.incorrect_answers]} onChange={this.onIncorrect_answerNameChange.bind(this)}/>
            </Col>
            </Form.Row>
            <br/>

            </Form.Group>
            <button type="submit" className="btn btn-primary">Click here to create another question</button>
            </Form>
            </Card>
            
            </h3>

            
           
            
            </div>   


        )
    }
  }

  export default CreateQuizForm;