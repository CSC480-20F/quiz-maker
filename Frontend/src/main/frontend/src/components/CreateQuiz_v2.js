// import React from 'react';
// import TopNavbar from './TopNavbar';
// import styled from 'styled-components';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// const API_URL = 
// 'https://opentdb.com/api.php?amount=10&type=multiple';


// const Styles = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding-top: 200px;
//     background-color:white;

// `;

// const Button = styled.button`
//     display: inline-block;
//     color: palevioletred;
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border: 2px solid palevioletred;
//     border-radius: 3px;
//     display: block;
// `;

// function Question(props) {
//     return (
//       <h2 className="question">{props.content}</h2>
//     );
//   }
  
//   Question.propTypes = {
//     content: PropTypes.string.isRequired
//   };



// class CreateQuiz_v2 extends React.Component{
//     constructor (props) {
//         super(props);
//         this.state = {
//             counter: 0,
//             questionId: 1,
//             question: '',
//             answerOptions: [],
//             answer: '',
//             answersCount: {},
//             result: '',
//             questions: []
//         };
//         // this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
//     }
//       renderQuiz() {
//         const [currentQuestion, setCurrentQuestion] = useState(0);
//         const [showScore, setShowScore] = useState(false);
//         const [score, setScore] = useState(0);
    
//         const handleAnswerOptionClick = (isCorrect) => {
//             if (isCorrect) {
//                 setScore(score + 1);
//             }
    
//             const nextQuestion = currentQuestion + 1;
//             if (nextQuestion < questions.length) {
//                 setCurrentQuestion(nextQuestion);
//             } else {
//                 setShowScore(true);
//             }
//         };
//         return (
//             <>
//             <Styles>
//                 <div>{this.state.question}<div>

//                 <Button>{this.state.answer}</Button> 
//                 <Button>{this.state.incorrect_answers[0]}</Button> 
//                 <Button>{this.state.incorrect_answers[1]}</Button> 
//                 <Button>{this.state.incorrect_answers[2]}</Button> 

//                 </div>
//                 </div>
//             </Styles>
//             </>
//         //   <Quiz
//         //     answer={this.state.answer}
//         //     answerOptions={this.state.answerOptions}
//         //     questionId={this.state.questionId}
//         //     question={this.state.question}
//         //     questionTotal={quizQuestions.length}
//         //     onAnswerSelected={this.handleAnswerSelected}
//         //   />
//         );
//       }


//     render() {
//         return(
//             <>
//             <TopNavbar/>
//             {/* {this.state.result ? this.renderResult() : this.renderQuiz()} */}
//             {/* <Styles>
//             <div>{this.state.question}<div>

//                 <Button>{this.state.correct_answer}</Button> 
//                 <Button>{this.state.incorrect_answers[0]}</Button> 
//                 <Button>{this.state.incorrect_answers[1]}</Button> 
//                 <Button>{this.state.incorrect_answers[2]}</Button> 

//             </div>
//             </div>
//             </Styles> */}
            
            
//         </>    
//         )
//     }; //render ends here
// }

// export default CreateQuiz_v2;