import React from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';

class CreateQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "fname":"Anisha",
            "lname":"KC",
            "age":20.0,
            "major":"Computer-Science",
            "response": ""
        }
    }

    handleGet(e) {
      e.preventDefault();
      axios.get(`http://localhost:9081/users/all`).then(res => {
        const data = res.data;
        this.setState({
          response: data
        })
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      const text = {
        "fname": "Anisha",
        "lname": "KC",
        "age": 20.0,
        "major": "Computer-Science"
    }
    // axios.post(`http://localhost:9081/users/testing-input`, { text })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    
  //   // console.log(JSON.stringify(text));
    let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', 'http://localhost:9080');
  headers.append('Access-Control-Allow-Credentials', 'true');

  headers.append('POST', 'GET', 'DELETE');

      axios.post('http://localhost:9081/users/testing-input', {
        // "fname": "Anisha",
        // "lname": "KC",
        // "age": 20.0,
        // "major": "Computer Science",
        data: text,
        headers: headers
      //   headers: { 'accept': '*/*',
      //   'Content-Type': 'application/json',
      // }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }


    render(){
        return(
         
        <div className="container">
        <TopNavbar/>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
        {/* <div className="form-group">
        <label htmlFor="name">Name of the Quiz</label>
        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputCourse1">Course</label>
        <input type="course" className="form-control" aria-describedby="courseHelp" value={this.state.course} onChange={this.onCourseChange.bind(this)} />
        </div>
        <div className="form-group">
        <label htmlFor="message">Put your questions here</label>
        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
        </div> */}
        <button type="submit" className="btn btn-primary">POST</button>
        </form>
        <form id="form" onSubmit={this.handleGet.bind(this)}>
        <button type="submit" className="btn btn-warning">GET</button>
        </form>
        <p> {this.state.response} </p>
        </div>
 );
}

  // onNameChange(event) {
	// this.setState({name: event.target.value})
  // }

  // onCourseChange(event) {
	// this.setState({course: event.target.value})
  // }

  // onMessageChange(event) {
	// this.setState({message: event.target.value})
  // }
}
    
export default CreateQuiz;

