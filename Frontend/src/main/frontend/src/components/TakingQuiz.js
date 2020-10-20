import React, { Component } from 'react';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import Loading from './Loading';
import axios from 'axios';
import {Card, ProgressBar, Form, Col, Button} from 'react-bootstrap';

const Styles = styled.div`
        ${'' /* display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 200px;

        .question-section {
        width: 100%;
        position: relative;
        }

        .question-count {
        margin-bottom: 20px;
        }

        .question-count span {
        font-size: 28px;
        }

        .question-text {
        margin-bottom: 12px;
        }

        .timer-text {
        background: rgb(0, 0, 0);
        padding: 15px;
        margin-top: 20px;
        margin-right: 20px;
        border: 5px solid rgb(0, 0, 0);
        border-radius: 15px;
        text-align: center;
        }

        .answer-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        }

        button {
        width: 100%;
        font-size: 16px;
        color: #ffffff;
        background-color: black;
        border-radius: 15px;
        display: flex;
        padding: 5px;
        justify-content: flex-start;
        align-items: center;
        border: 5px solid white;
        cursor: pointer;
        }

        .correct {
        background-color: white;
        }

        .incorrect {
        background-color: red;
        }

        button:hover {
        background-color: #555e7d;
        }

        button:focus {
        outline: none;
        }

        button svg {
        margin-right: 5px;
        } */}
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

`;

class TakeQuiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      "questions": [],
      "quizTitle": "Quiz Title",
      "currentQuestion": 0,
      "score": 0,
      "topics": ["Topic 1", "My Topic", "Another Topic"],
      "isLoading": true,
      "showScore": false,
      "selectedID": "",
      "selected": false,
      "allAnswers": []
    }
  }

  componentDidMount () {
    this.mounted = true;
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple').then(res => {
      if(this.mounted){
        this.setState({
          questions: res.data.results,
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
    }
  }

  handleAnswerClick = (chosenAnswer) => {
    this.setState({selectedID: chosenAnswer, selected: true})
    if (this.state.questions[this.state.currentQuestion].correct_answer === chosenAnswer) {
      this.setState({score: this.state.score + 1})
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
    
    const takingQuiz = this.state.showScore ? (
      <h1> You scored: {this.state.score}/{questions.length} </h1>
    ):(
      <>
      <div className="spacer">{this.state.quizTitle} is about: <span className="topics"> {this.state.topics.join(', ')}. </span></div>
        <Card className="main-card rounded-corner">
          <ProgressBar variant="custom" now={currentPlace} label={`${currentPlace}%`} />
          <div className="small-spacer"></div>
          
          <Card className="whole-question-card rounded-corner">
            <h1 className="subtitle">Question {currentQuestion + 1} </h1>

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
      <Styles>
      <div className="container">
        <h1 className="header">{this.state.quizTitle}</h1>
        {takingQuiz}
      </div>
      </Styles>
    )
  }
}

export default TakeQuiz;
// const TakeQuiz = () => {

//     const API_URL = 'http://localhost:9084/quizzes/all';
//     const [questions,setQuestions ]= useState({})
// 	  const [currentQuestion, setCurrentQuestion] = useState(0);
// 	  const [showScore, setShowScore] = useState(false);
//     const [score, setScore] = useState(0);

//     useEffect(() => {
//         fetch(
//           API_URL,{method: "GET"}
//         )
//           .then(res => res.json())
//           .then(response => {
//             // console.log(response[5])
//             setQuestions(response[5].quizQuestions);
//             // console.log(questions)
//           })
//           .catch(error => console.log(error));
//       }, []);

    

// 	const handleAnswerOptionClick = (isCorrect) => {
// 		if (isCorrect) {
// 			setScore(score + 1);
// 		}

// 		const nextQuestion = currentQuestion + 1;
// 		if (nextQuestion < questions.length) {
// 			setCurrentQuestion(nextQuestion);
// 		} else {
// 			setShowScore(true);
// 		}
//     };
    
//     if(!questions.length) return (<div className="container-middle"><Loading type={'balls'} color={'#235937'}/></div>);

// 	return (
//         <>
//         <TopNavbar/>
//         <Styles>
// 		<div className='app'>
// 			{showScore ? (
// 				<div className='score-section'>
// 					You scored {score} out of {questions.length}
// 				</div>
// 			) : (
// 				<>
// 					<div className='question-section'>
// 						<div className='question-count'>
// 							<span>Question {currentQuestion + 1}</span>/{questions.length}
// 						</div>
// 						<div className='question-text'>{questions[currentQuestion].question}</div>
// 					</div>
// 					<div className='answer-section'>
//           <button onClick={() => handleAnswerOptionClick(true)}>{questions[currentQuestion].answer}</button>
// 						{(questions[currentQuestion].incorrect_answers).map((answerOption) => {
// 							return (<button key={Math.random()*5} onClick={() => handleAnswerOptionClick(false)}>{answerOption}</button>);
//             })}
// 					</div>
// 				</>
// 			)}
// 		</div>
//         </Styles>
//         </>
// 	);
// }