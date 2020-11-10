import React from 'react'
import Card from 'react-bootstrap/Card'
import quizmakerlogo from '../assets/quizmakerloginlogo.png'
// import quizmakerlogo from '../assets/Artboard22.png'
import { Link } from 'react-router-dom'

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

        const ColoredLine = ({ color }) => (
            <hr
            
                style={{
                    color: color,
                    backgroundColor: color,
                    height: '0.5px',
                    marginTop: '5px'
                }}
            />
        );

        return (
            
            <div className = "container-center">

            <img className="login-oswego-logo" alt="SUNY Oswego Logo" src={oswegologo}/>

            <Card border="white" style={{ alignItems:'center',borderRadius: '20px', width: '25rem', height:'20rem', display: 'center', margin: 'auto'}}>
            {/* <Card.Header style ={{textAlign: "center", fontSize:"30px"}}><b>QuizMaker</b></Card.Header>  */}
            <Card.Body>
           
            <img className="login-quizmaker-logo" alt="QuizMaker Logo" src={quizmakerlogo} style={{display:"center", paddingTop:'50px', paddingBottom:'50px'}}/>

            <div>
            {/* <div style={{display: 'flex',  justifyContent:'center', alignItems: 'center'}}> </div> */}
            <div className="login-border" id="login-button">Sign in</div>
            {/* <ColoredLine color="black" /> */}
            <Card.Footer className="login-footer">
            <Link to="/About">About</Link>
            </Card.Footer>

            </div>  

         

            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Login;