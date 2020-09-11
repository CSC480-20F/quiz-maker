import React from 'react'

class Login extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            <div className="container">
                <h1> QuizMaker </h1>
                <div id="login-button">Sign in with Google</div>
            </div>
        )
    }
}

export default Login;