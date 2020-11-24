import React from 'react'
import Card from 'react-bootstrap/Card'
import quizmakerlogo from '../assets/quizmakerloginlogo.png'
// import quizmakerlogo from '../assets/Artboard22.png'
import { Link } from 'react-router-dom'
import quizmakerlogov2 from '../assets/Final_White_Background.png'
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
            <>
            <div className = "container-center">

            <img className="login-oswego-logo" alt="SUNY Oswego Logo" src={oswegologo}/>

            <Card border="white" style={{ alignItems:'center',borderRadius: '20px', width: '25rem', height:'20rem', display: 'center', margin: 'auto'}}>
            
            <Card.Body>
           
            <img className="login-quizmaker-logo" alt="QuizMaker Logo" src={quizmakerlogo} style={{display:"center", paddingTop:'50px', paddingBottom:'50px'}}/>
            {/* <img alt="QuizMaker Logo" src={quizmakerlogov2} style={{width:'250px', height:'auto'}}/> */}
            {/* <img className="login-quizmaker-logo" alt="QuizMaker Logo" src={quizmakerlogov2} style={{display:"center", paddingTop:'50px', paddingBottom:'50px'}}/> */}

            <div>
            
                <div className="login-border" id="login-button">Sign in</div>
                {/* <Card.Footer className="login-footer">
                    <Link style={{fontSize:'12px', fontFamily:'Roboto', color:'#808080'}} to="/About">About</Link>
                </Card.Footer> */}
            </div>  

            </Card.Body>
          </Card>
          </div>

          <div className = "container-middle">
          {/* <img className="login-oswego-logo-2" alt="SUNY Oswego Logo" src={oswegologo}/> */}
          <Link style={{fontSize:'12px', fontFamily:'Roboto', color:'#808080'}} to="/About">About</Link>
          </div>
          </>
        )
    }
}

export default Login;