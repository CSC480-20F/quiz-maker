import React from 'react'
import Card from 'react-bootstrap/Card'
import Font from '../App.css'


class Login extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            <div className = "login">
            <Card border="black" style={{ borderRadius: '20px', width: '25rem', height:'20rem', display: 'center', margin: 'auto' }}>
            {/* <Card.Header style ={{textAlign: "center", fontSize:"30px"}}><b>QuizMaker</b></Card.Header>  */}
            <Card.Body style ={{textAlign: "center", color: '#286896' ,fontSize:"50px", height: '20rem', width: '24.5rem', fontFamily: Font}}><b>QuizMaker</b>
              <Card.Text>
              <div id="login-button" style = {{display: 'flex',  justifyContent:'center', alignItems: 'center', padding: '10%'}}>Sign in with Google</div>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Login;