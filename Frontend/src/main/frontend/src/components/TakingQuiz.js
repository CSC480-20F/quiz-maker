import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import Loading from './Loading';

const Styles = styled.div`
        display: flex;
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

        /* ANSWERS/RIGHT SECTION */
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
        }

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

const TakeQuiz = () => {

    const API_URL = 'http://localhost:9084/quizzes/all';
    const [questions,setQuestions ]= useState({})
	  const [currentQuestion, setCurrentQuestion] = useState(0);
	  const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch(
          API_URL,{method: "GET"}
        )
          .then(res => res.json())
          .then(response => {
            // console.log(response[5])
            setQuestions(response[5].quizQuestions);
            // console.log(questions)
          })
          .catch(error => console.log(error));
      }, []);

    

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
    };
    
    if(!questions.length) return (<Loading/>);

	return (
        <>
        <TopNavbar/>
        <Styles>
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
          <button onClick={() => handleAnswerOptionClick(true)}>{questions[currentQuestion].answer}</button>
						{(questions[currentQuestion].incorrect_answers).map((answerOption) => {
							return (<button key={Math.random()*5} onClick={() => handleAnswerOptionClick(false)}>{answerOption}</button>);
            })}
					</div>
				</>
			)}
		</div>
        </Styles>
        </>
	);
}

export default TakeQuiz;