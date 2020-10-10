import React from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { CardColumns, Card } from 'react-bootstrap';
import { CSVReader } from 'react-papaparse';

// class CreateQuiz extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             "fname":"",
//             "lname":"",
//             "age":"",
//             "major":"",
//             "response": []
//         }
//     }

//     handleGet(e) {
//       e.preventDefault();
//       axios.get(`http://localhost:9081/users/all`).then(res => {
//         const data = res.data;
//         console.log(data);
//         this.setState({
//           response: data
//         })
//       });
//     }

//     handleSubmit(e) {
//       e.preventDefault();
//     axios.post(`http://localhost:9081/users/testing-input`, {
//       "fname": this.state.fname,
//       "lname": this.state.lname,
//       "age": this.state.age,
//       "major": this.state.major
//     })
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//         this.setState({
//           fname:"",
//           lname:"",
//           age:"",
//           major:""
//         })
//       }).catch(error =>{
//         console.log(error.response);
//       })  
//     }

//     render(){
//         return(
//           <>
//           <TopNavbar/>
//         <div className="container">
        
//         <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>

//         <div className="form-group">
//         <label htmlFor="firstName">First Name</label>
//         <input type="text" className="form-control" value={this.state.fname} onChange={this.onNameChange.bind(this)} />
//         </div>
//         <div className="form-group">
//         <label htmlFor="lastName">Last Name</label>
//         <input type="text" className="form-control" value={this.state.lname} onChange={this.onLastNameChange.bind(this)} />
//         </div>
//         <div className="form-group">
//         <label htmlFor="age">Age</label>
//         <input type="text" className="form-control"  value={this.state.age} onChange={this.onAgeChange.bind(this)} />
//         </div>
//         <div className="form-group">
//         <label htmlFor="major">Major</label>
//         <input type="text" className="form-control" value={this.state.major} onChange={this.onMajorChange.bind(this)} />
//         </div>
//         <button type="submit" className="btn btn-primary">POST</button>
//         </form>
//         <div className="spacer"></div>
//         <form id="form" onSubmit={this.handleGet.bind(this)}>
//         <button type="submit" className="btn btn-warning">GET</button>
//         </form>
//         <div className="spacer"></div>
//         <CardColumns>
//         {this.state.response.map(user => (
//         <Card key={user._id.$oid} style={{padding: '15px'}}>
//         <Card.Title> {user.fname} {user.lname} </Card.Title>
//         <li> Age: {user.age} </li>
//         <li> Major: {user.major} </li>
//         </Card>
//       ))}
//       </CardColumns>
//         </div>
//         </>
//  );
// }

//   onNameChange(event) {
// 	this.setState({fname: event.target.value})
//   }

//   onLastNameChange(event){
//     this.setState({lname: event.target.value})
//   }

//   onAgeChange(event) {
// 	this.setState({age: parseInt(event.target.value)})
//   }

//   onMajorChange(event) {
// 	this.setState({major: event.target.value})
//   }
// }

const buttonRef = React.createRef()

class CreateQuiz extends React.Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <>
        <TopNavbar/>
        <div className="container">
        <h5>Basic Upload</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        </div>
      </>
    )
  }
  
}
    
export default CreateQuiz;

