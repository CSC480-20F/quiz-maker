import React from 'react'
import Card from 'react-bootstrap/Card'
import Font from '../App.css'
import quizmakerlogo from './quizmakerloginlogo.png'
import oswegologo from './non-invert-logo.png'

class Login extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            
            <div className = "container-center">

            <img className="login-oswego-logo" src={oswegologo}/>

            <Card border="white" style={{ alignItems:'center',borderRadius: '20px', width: '25rem', height:'20rem', display: 'center', margin: 'auto'}}>
            {/* <Card.Header style ={{textAlign: "center", fontSize:"30px"}}><b>QuizMaker</b></Card.Header>  */}
            <Card.Body>
           
            <img className="login-quizmaker-logo" src={quizmakerlogo} style={{display:"center"}}/>
            <div id="login-button" style = {{display: 'flex',  justifyContent:'center', alignItems: 'center', paddingTop:'70px'}}>Sign in with Google</div>
              
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Login;