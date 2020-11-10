import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginPage from './components/Login';
import Loading from './components/Loading';
import Course from './components/Course';
import CreateQuiz from './components/CreateQuiz';
import Courses from './components/Courses';
import Quizzes from './components/Quizzes';
import TakeQuiz from './components/TakingQuiz';
import RosterUpload from './components/RosterUpload';
// import CreateQuizForm from './components/CreateQuizForm'
import UserProvider from './context/UserContext';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import About from './components/About';


class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, condition: Condition, ...props } = this.props

    if (Condition === null) {
      return (
        <div className='container-center'>
          <Loading type={'spin'} color={'#235937'}/>
        </div>
      )
    }
    return (
      <Route 
        {...props}
        render={props => (
          Condition ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}

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
        client_id: '11698435631-cav1if2lia71joo1icee09aik0la3k1n.apps.googleusercontent.com',
        hosted_domain: 'oswego.edu'
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
            <div className='container-center'>
              <Loading type={'spin'} color={'#235937'}/>
            </div>
          )
      }
      return this.state.isSignedIn ?
          <Component/> :
          <LoginPage/>
  }

  render() {
      return (
        <UserProvider>
          <BrowserRouter>
            <NotificationContainer/>
              <Switch>
                  <Route exact path="/" render={() => this.ifUserSignedIn(Dashboard)}/>
                  <ProtectedRoute path="/Courses/:course_id/:quiz_id" condition={this.state.isSignedIn} component={TakeQuiz}/>
                  <ProtectedRoute path="/Courses/:course_id" condition={this.state.isSignedIn} component={Course}/>
                  <ProtectedRoute path="/CreateQuiz/:course_id" condition={this.state.isSignedIn} component={CreateQuiz}/>
                  <ProtectedRoute exact path="/CreateQuiz" condition={this.state.isSignedIn} component={CreateQuiz}/>
                  <ProtectedRoute exact path="/Courses" condition={this.state.isSignedIn} component={Courses}/>
                  <ProtectedRoute exact path="/Quizzes" condition={this.state.isSignedIn} component={Quizzes}/>
                  <ProtectedRoute path="/Quizzes/:quiz_id" condition={this.state.isSignedIn} component={TakeQuiz}/>
                  <ProtectedRoute path="/RosterUpload" condition={this.state.isSignedIn} component={RosterUpload}/>
                  {/* <ProtectedRoute path="/CreateQuizForm" condition={this.state.isSignedIn} component={CreateQuizForm}/> */}
                  <Route path="/About" component={About}/>
              </Switch>
          </BrowserRouter>
        </UserProvider>
      )
  }
}

export default App;
