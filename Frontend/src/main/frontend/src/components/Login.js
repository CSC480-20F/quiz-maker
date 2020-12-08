// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react'
import Card from 'react-bootstrap/Card'
import quizmakerlogo from '../assets/quizmakerloginlogo.png'
import { Link } from 'react-router-dom'
import oswegologo from '../assets/non-invert-logo.png'

class Login extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button', {'width': 250, 'longtitle': true,})
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
                <div>
                    <div className="login-border" id="login-button">Sign in</div>
                </div>  
            </Card.Body>

            </Card>
            </div>

            <div className = "container-middle">
            <Link style={{fontSize:'12px', fontFamily:'Roboto', color:'#808080'}} to="/About">About</Link>
            </div>
            </>
        )
    }
}

export default Login;