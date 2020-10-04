import React from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';

class CreateQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "fname":"",
            "lname":"",
            "age":"",
            "major":"",
            "response": ""
        }
    }

    handleGet(e) {
      e.preventDefault();
      axios.get(`http://localhost:9081/users/all`).then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          response: data
        })
      });
    }

    handleSubmit(e) {
      e.preventDefault();
    axios.post(`http://localhost:9081/users/testing-input`, {
      "fname": this.state.fname,
      "lname": this.state.lname,
      "age": this.state.age,
      "major": this.state.major
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(error =>{
        console.log(error.response);
      })  
    }


    render(){
        return(
         
        <div className="container">
        <TopNavbar/>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" className="form-control" value={this.state.fname} onChange={this.onNameChange.bind(this)} />
        </div>
        <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" className="form-control" value={this.state.lname} onChange={this.onLastNameChange.bind(this)} />
        </div>
        <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="text" className="form-control"  value={this.state.age} onChange={this.onAgeChange.bind(this)} />
        </div>
        <div className="form-group">
        <label htmlFor="major">Major</label>
        <input type="text" className="form-control" value={this.state.major} onChange={this.onMajorChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary">POST</button>
        </form>
        <div className="spacer"></div>
        <form id="form" onSubmit={this.handleGet.bind(this)}>
        <button type="submit" className="btn btn-warning">GET</button>
        </form>
        <p> {this.state.response} </p>
        </div>
 );
}

  onNameChange(event) {
	this.setState({fname: event.target.value})
  }

  onLastNameChange(event){
    this.setState({lname: event.target.value})
  }

  onAgeChange(event) {
	this.setState({age: parseInt(event.target.value)})
  }

  onMajorChange(event) {
	this.setState({major: event.target.value})
  }
}
    
export default CreateQuiz;

