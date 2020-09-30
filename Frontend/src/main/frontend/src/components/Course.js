import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';
import { Button, Card } from "react-bootstrap";
import TopQuizzes from './TopQuizzes';

class Course extends Component {
    state = {
        post: null,
        textID: ''
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("https://jsonplaceholder.typicode.com/users/" + id).then(res => {
            this.setState({
                post: res.data
            })
        })
        // const text = {
        //     "fname": "Anisha",
        //     "lname": "KC",
        //     "age": 20.0,
        //     "major": "Computer-Science"
        // }
        
        // console.log(JSON.stringify(text));

        // axios({
        //     method: 'post',
        //     url: 'http://localhost:9081/users/testing-input',
        //     data: text
        //   }).then(response => {
        //     this.props.history.push('/MainPage')
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   });

    //     axios.post('https://localhost:9081/info/testing-input',  JSON.stringify(text))
    //     .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })

        // (async () => {
        //     const json = JSON.stringify({ "fname":"Anisha",
        //     "lname":"KC",
        //     "age":20.0,
        //     "major":"Computer-Science" });
        //     const res = await axios.post('http://localhost:9081/users/testing-input', json);
        
        //     // all of the script.... 
        
        // })();
        // nothing else

        // const json = JSON.stringify({ "fname":"Anisha",
        //     "lname":"KC",
        //     "age":20.0,
        //     "major":"Computer-Science" });
        // const res = await axios.post('http://localhost:9081/users/testing-input', json);

        // // axios.post('http://localhost:9081/users/testing-input', JSON).then(response => 
        // //     this.setState({ textID: response.data.id }));

        // Axios automatically sets the `Content-Type` based on the
        // 2nd parameter to `axios.post()`.
        // res.data.headers['Content-Type'];

        // const res = await axios.post('http://localhost:9081/users/testing-input', { 
        //     "fname":"Anisha",
        //     "lname":"KC",
        //     "age":20.0,
        //     "major":"Computer-Science" });

        // res.data.data; // '{"answer":42}'
        // res.data.headers['Content-Type']; 
        // // axios.post('http://localhost:9081/users/testing-input', JSON).then(response => 
        // //     this.setState({ textID: response.data.id }));
    }

    handleClick() {
        window.location.assign('http://localhost:9081/info/mock-users');
    }

    render () {
        const post = this.state.post ? (
            <div>
                <TopNavbar/>
                <div className='container-middle'> 
                    <h1 className="center header">{this.state.post.name}</h1>
                    <div style={{padding: '10px'}}> </div>
                    <Button className ='center' variant='warning' className='create-quiz' onClick={this.handleClick.bind(this)}>Create a Quiz</Button>
                </div>

                <div className='container'>
                    <div style={{padding: '10px'}}> </div>
                    <TopQuizzes />

                    <div style={{padding: '10px'}}> </div>
                    <h1 className='subtitle'> Quizzes </h1>
                    <Card className='rounded-corner'>
                        <QuizTable />
                    </Card>
                </div>
            </div>
        ) : (
            <div> <TopNavbar/>
            <div className="container"> Loading course...</div>
            </div>
        )
        return(
            <div>
                {post}
                <h1 className='header'> {this.state.textID} </h1>
            </div>
        )
    }
}

export default Course;