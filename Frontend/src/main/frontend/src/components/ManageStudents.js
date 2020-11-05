import React, { Component } from 'react';
import {Card, Form, Col, Button, Spinner, CardGroup, CardDeck} from 'react-bootstrap';
import styled from 'styled-components';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';

const Style = styled.div`
    .main-card {
      padding: 30px;
    }

    .mode-card {
        padding: 20px;
        align-items: center;
        border: white;
    }

    .mode {
        background-color: #8F0047;
        color: white;
        font-family: Roboto;
        min-width: fit-content;
        max-width: 60%
    }

    .input {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        padding-left: 15px;
        box-shadow: none;
    }

    .submit-button {
        background-color: #8F0047;
        color: white;
        font-family: Roboto;
        min-width: 25%;
        align-self: center;
    }

    .save-button {
        background-color: #8F0047;
        color: white;
        font-family: Roboto;
        max-width: fit-content;
        align-self: flex-end;
    }

    .remove {
        background-color: #8F0047;
        color: white;
        font-family: Roboto;
        min-width: fit-content;
    }

    .student-card {
        align-items: center;
        padding: 15px; 
        min-width: fit-content;
        max-width: 30%;
    }

    .removed {
        border-style: solid;
        border-width: medium;
        border-color: #8F0047 !important;
    }
`;

class ManageStudents extends Component {
    state = {
        courseID: this.props.courseID,
        courseRoster: [],
        addStudentMode: false,
        removeStudentMode: false,
        updatingDB: false,
        loadingRoster: true,
        inputName: "",
        inputEmail:"",
        addedNames: [],
        addedEmails: [],
        removeStudents: []
    }

    componentDidMount () {
        let id = this.props.courseID;
        axios.get("http://pi.cs.oswego.edu:9083/courses/get-course-roster/" + id).then(res => {
            this.setState({courseRoster: res.data, loadingRoster: false})
        }).catch(err => {console.log(err)})
    }


    finishAddingStudents = () => {
        if (this.state.addedEmails.length > 0) {
            this.setState({updatingDB: true})
            axios.put(`http://pi.cs.oswego.edu:9081/users/add-course`, {
                "id": this.state.courseID,
                "names":this.state.addedNames,
                "emails": this.state.addedEmails
            }).then(res => {
                console.log(res)
                this.updateCourse()
            }).catch(error =>{
                NotificationManager.error('Problem updating roster. Try again!', 'Error', 4000);
                this.setState({updatingDB: false})
                console.log(error);
            })  
        } else {
            NotificationManager.error('You need to have at least one student!', 'No new Student', 4000);
            NotificationManager.info("If you don't want to add new student, head back by pressing Back to Panel", "Don't want to add?");
        }
    }

    finishRemovingStudents = () => {
        if (this.state.removeStudents.length > 0) {
            this.setState({updatingDB: true})
            axios.put(`http://pi.cs.oswego.edu:9081/users/remove-from-course`, {
                "id": this.state.courseID,
                "emails": this.state.removeStudents
            }).then(res => {
                console.log(res)
                this.updateCourse()
            }).catch(error =>{
                NotificationManager.error('Problem updating roster. Try again!', 'Error', 4000);
                this.setState({updatingDB: false})
                console.log(error);
            })  
        } else {
            NotificationManager.error('You need to delete at least one student!', 'No student selected', 4000);
            NotificationManager.info("If you don't want to delete new student, head back by pressing Back to Panel", "Don't want to delete?");
        }
    }

    updateCourse = () => {
        let copyArray = this.state.courseRoster;
        copyArray = copyArray.filter( ( el ) => !this.state.removeStudents.includes( el ) );
        this.setState({courseRoster: copyArray})
        axios.put(`http://pi.cs.oswego.edu:9083/courses/update-course-roster`, {
            "courseID": this.state.courseID,
            "courseRoster": this.state.courseRoster
        }).then(res => {
            console.log(res)
            NotificationManager.success("Course roster successfully updated!", 'Updated Roster', 3000);
            this.setState({updatingDB: false, addedNames: [], addedEmails: [], removeStudents: []})
        }).catch(error =>{
            NotificationManager.error('Problem updating roster. Try again!', 'Error', 4000);
            this.setState({updatingDB: false})
            console.log(error);
        })  
    }

    onNameChange(event) {this.setState({inputName: event.target.value})}
    onEmailChange(event) {this.setState({inputEmail: event.target.value})}

    addStudent = () => {
        if (this.state.inputEmail.length < 1 || this.state.inputName < 1) {
            NotificationManager.error('You need to input both name and email!', 'Fill out fields', 4000);
            return;
        }
        this.setState({
            addedNames: [...this.state.addedNames, this.state.inputName],
            addedEmails: [...this.state.addedEmails, this.state.inputEmail],
            courseRoster: [...this.state.courseRoster, this.state.inputEmail],
            inputEmail: "", inputName: ""
        })
    }

    toggleStudent = (student) => {
        if (!this.state.removeStudents.includes(student)){
            this.setState({removeStudents: [...this.state.removeStudents, student]})
        } else {
            const filteredArray = this.state.removeStudents.filter(item => item !== student)
            this.setState({removeStudents: filteredArray});
        }
    }

    render () {

        const students = this.state.courseRoster.map((student,i) => {
            return (
                <Card key={i} className="student-card" border="secondary"> {student} </Card>
            )
        })

        const removeStudents = this.state.courseRoster.map((student,i) => {
            return (
                <Card key={i} onClick={e => this.toggleStudent(student)} className={this.state.removeStudents.includes(student) ? ("removed student-card"):("student-card")} border="secondary"> {student} </Card>
            )
        })

        const content = this.state.loadingRoster ? (
            <div className="container-middle"><Spinner animation="border" variant="dark" /> Getting Course Roster...</div>
        ):(
            this.state.updatingDB ? (
                <div className="container-middle"><Spinner animation="border" variant="dark" /> Updating Roster...</div>
            ):(
                this.state.addStudentMode ? (
                    <>
                    <h1 style={{fontFamily: "Roboto", fontSize: "18px", textAlign: "center"}}>Current Students:</h1>
                    <div className="small-spacer"></div>

                    <CardDeck style={{display: "flex", flexWrap: "wrap", alignContent: "flex-start"}}>{students}</CardDeck>

                    <div className="small-spacer"></div>
                    <div className="container-middle">
                    <Form inline>
                        <Col xs="auto">
                        <Form.Control required className="input mb-2 mr-sm-2" type="text" placeholder="Student's Full Name" value={this.state.inputName} onChange={this.onNameChange.bind(this)} aria-label="Input the student's full name"/>
                        <Form.Control required className="input mb-2 mr-sm-2" type="text" placeholder="Student's Oswego Email" value={this.state.inputEmail} onChange={this.onEmailChange.bind(this)} aria-label="Input the student's Oswego email"/>
                        </Col>
                        <Col xs="auto"><Button id="dark-mode-button" variant="light" className="submit-button rounded-corner mb-2" onClick={() => this.addStudent()}> Add Student </Button> </Col>
                    </Form>
                    </div>
                    <Button variant="light" id="dark-mode-button" className="save-button rounded-corner" onClick={() => this.finishAddingStudents()}>Save Changes</Button>
                    </>
                ):(
                    this.state.removeStudentMode ? (
                        <>
                        <h1 style={{fontFamily: "Roboto", fontSize: "18px", textAlign: "center"}}>Current Students:</h1>
                        <div className="small-spacer"></div> 

                        <div className="container-middle">Note: Select the students to be removed and click "Remove Students"</div>
                        <CardDeck style={{display: "flex", flexWrap: "wrap", alignContent: "flex-start"}}>{removeStudents}</CardDeck>
                        <div className="small-spacer"></div>
                        <Button variant="light" id="dark-mode-button" className="save-button rounded-corner" onClick={() => this.finishRemovingStudents()}>Remove Students</Button>
                        </>
                    ):(
                        <CardGroup className="rounded-corner">
                            <Card className="rounded-corner mode-card">
                                <Button variant="light" id="dark-mode-button" className="mode rounded-corner" onClick={() => this.setState({addStudentMode: !this.state.addStudentMode})}>Add Students </Button>
                            </Card>
                            <Card className="rounded-corner mode-card">
                                <Button variant="light" id="dark-mode-button" className="mode rounded-corner" onClick={() => this.setState({removeStudentMode: !this.state.removeStudentMode})}>Remove Students </Button>
                            </Card>
                        </CardGroup>
                    )
                )
            )
        )

        return (
            <Style>
            <div className="container">
            <h1 className="subtitle"> Manage Students </h1>
            <Card className="rounded-corner main-card">
              {content}
            </Card>
            </div>
            </Style>
        )
    }
}

export default ManageStudents;