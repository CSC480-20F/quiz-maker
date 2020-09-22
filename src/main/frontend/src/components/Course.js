import React, { Component } from 'react';
import SideNavbar from './SideNavbar';
import axios from 'axios';
import QuizTable from './QuizTable';

class Course extends Component {
    state = {
        post: null
    }

    componentDidMount() {
        let id = this.props.match.params.course_id;
        axios.get("https://jsonplaceholder.typicode.com/users/" + id).then(res => {
            console.log(res.data)
            this.setState({
                post: res.data
            })
        })
    }

    render () {
        const post = this.state.post ? (
            <div>
                <SideNavbar/>
                <div className='content'>
                <div className='container'> 
                <h4 className="center">{this.state.post.name}</h4> 
                <QuizTable />
                </div>
                </div>
            </div>
        ) : (
            <div> <SideNavbar/>
            <div className="container"> Loading course...</div>
            </div>
        )
        return(
            <div>
                {post}
            </div>
        )
    }
}

export default Course;