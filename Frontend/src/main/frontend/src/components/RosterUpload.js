import React from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { Button } from 'react-bootstrap';
import { CSVReader } from 'react-papaparse';


const buttonRef = React.createRef()

class RosterUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        "response": [],
        "emails": [],
        "names": [],
        "course": "",
        "professor": window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
        "courseID": ""
    }
  }

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnDrop = (data) => {
    this.setState({
      "response": data
    })
    this.setState({
      "emails": this.state.response.map(d => {
        return d.data.Emails;
      }),
      "names": this.state.response.map(d => {
        return d.data.Name;
      })
    })
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log(data)
  }

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  onCourseChange(event) {
	  this.setState({course: event.target.value})
  }

  postToUsers = () => {
    console.log("Posting to the User's DB");
    axios.put(`http://pi.cs.oswego.edu:9081/users/add-course`, {
    "id": this.state.courseID,
    "names": this.state.names,
    "emails": this.state.emails
    })
    .then(res => {
      this.setState({
        course:""
      })
      window.alert("Course created! 🥳 " );
      this.props.history.push('/');
    }).catch(error =>{
      console.log(error);
      window.alert("Problem creating the Course. Please try again 😞" );
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    const courseName = this.state.course.replace(/,/g,"");
    const teacherEmail = this.state.professor;
    const emails = this.state.emails.toString();
    const sendString = teacherEmail + "," + courseName + "," + emails;
    console.log(sendString);


    if (this.state.emails.length === 0) {
      window.alert("You need to upload a Roster properly! 😅"); 
      return;
    }

    axios.get('http://pi.cs.oswego.edu:9083/courses/create-course/' + sendString).then(res => {
      this.setState({
        courseID: res.data
      })
      this.postToUsers();
    }).catch(err => {
      console.log(err);
      window.alert("Problem creating the Course 😞" );
    })
  }

  render() {
    return (
      <>
        <TopNavbar/>
        <div className="container-middle">
        <h1 className="subtitle small-spacer">Upload the Class Roster</h1>
        </div>
        <div className="container">
        <CSVReader
          required
          config={{header: true, skipEmptyLines: true}}
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        <form id="course-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="course">Course Name</label>
        <div className="small-spacer">
        <input type="text" required className="form-control" value={this.state.course} onChange={this.onCourseChange.bind(this)} />
        </div>
        <Button type="submit" className="btn-warning"> Add Roster </Button>
        </form>
        </div>
      </>
    )
  }

}

export default RosterUpload;
