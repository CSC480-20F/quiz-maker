import React from 'react';
import TopNavbar from './TopNavbar';
import styled from 'styled-components';
import axios from 'axios';

const API_URL = 
'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple';


const Styles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 200px;
    background-color:purple;

`;

const Button = styled.button`
    display: inline-block;
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
`;




class CreateQuiz_v2 extends React.Component{

        state = {
            "question":"",
            "correct_answer":"",
            "incorrect_answers":[]
        }
    

    componentDidMount() {
        axios.get(API_URL).then(res => {
          const data = res.data.results[0];
          console.log(data.results);
          
          this.setState({

            "question":data.question,
            "correct_answer":data.correct_answer,
           // "incorrect_answers":[...this.state.incorrect_answers, [data.incorrect_answers]]
            "incorrect_answers": data.incorrect_answers
            
          })

          console.log(this.state.incorrect_answers)
        });
      }

    render() {
        return(
            <>
            
            <div><TopNavbar/></div>
            <Styles>
            <div>{this.state.question}<div>

                <Button>{this.state.correct_answer}</Button> 
                <Button>{this.state.incorrect_answers[0]}</Button> 
                <Button>{this.state.incorrect_answers[1]}</Button> 
                <Button>{this.state.incorrect_answers[2]}</Button> 

            </div>
            </div>
            </Styles>
            
            
        </>    
        )
    }; //render ends here
}

export default CreateQuiz_v2;