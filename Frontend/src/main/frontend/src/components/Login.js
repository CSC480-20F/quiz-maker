import React from 'react'
import Card from 'react-bootstrap/Card'
import Font from '../App.css'
import quizmakerlogo from '../assets/quizmakerloginlogo.png'
// import quizmakerlogo from '../assets/Artboard22.png'

import oswegologo from '../assets/non-invert-logo.png'

class Login extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button',
            {
                'width': 250,
                'longtitle': true,
                
                
            }
            )
        })
    }

    render() {
        return (
            
            <div className = "container-center">

            <img className="login-oswego-logo" src={oswegologo}/>

            <Card border="white" style={{ alignItems:'center',borderRadius: '20px', width: '25rem', height:'20rem', display: 'center', margin: 'auto'}}>
            {/* <Card.Header style ={{textAlign: "center", fontSize:"30px"}}><b>QuizMaker</b></Card.Header>  */}
            <Card.Body>
           
            <img className="login-quizmaker-logo" src={quizmakerlogo} style={{display:"center", paddingTop:'50px', paddingBottom:'50px'}}/>

            <div>
            {/* <div style={{display: 'flex',  justifyContent:'center', alignItems: 'center'}}> </div> */}
            <div className="login-border" id="login-button">Sign in</div>
            
            </div>  
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Login;