import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginPage from './components/Login';

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          isSignedIn: null
      }
  }

  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '11698435631-cav1if2lia71joo1icee09aik0la3k1n.apps.googleusercontent.com'
      }).then(() => {
        const authInstance =  window.gapi.auth2.getAuthInstance()
        const isSignedIn = authInstance.isSignedIn.get()
        this.setState({isSignedIn})
        authInstance.isSignedIn.listen(isSignedIn => {
          this.setState({isSignedIn})
        })
      })
    })
  }


  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.onload = () => this.initializeGoogleSignIn()
    document.body.appendChild(script)
  }


  ifUserSignedIn(Component) {
      if (this.state.isSignedIn === null) {
          return (
              <h1>Loading...</h1>
          )
      }
      return this.state.isSignedIn ?
          <Component/> :
          <LoginPage/>
  }

  render() {
      return (
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" render={() => this.ifUserSignedIn(Dashboard)}/>
                  <Route path="/dashboard" render={() => this.ifUserSignedIn(Dashboard)}/>
              </Switch>
          </BrowserRouter>
      )
  }
}

export default App;
