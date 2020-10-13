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
                "course": "",
                "professor": window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
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

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://localhost:9083/courses/testing-input`, {
      "teacher": this.state.professor,
      "courseName": this.state.course,
      "courseRoster": this.state.emails
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          course:""
        })
      }).catch(error =>{
        console.log(error.response);
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
        <input type="text" className="form-control" value={this.state.course} onChange={this.onCourseChange.bind(this)} />
        </div>
        <Button type="submit" className="btn-warning"> Add Roster </Button>
        </form>
        </div>
      </>
    )
  }

}

export default RosterUpload;
