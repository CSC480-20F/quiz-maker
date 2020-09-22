import React, { Component } from 'react';
import SideNavbar from './SideNavbar';

class Course extends Component {

    render () {
        const course = this.props.course ? (
            <div>
                <SideNavbar/>
                <h4 className="center">{this.props.course.name}</h4>
            </div>
        ) : (
            <div> <SideNavbar/>
            <div className="container"> Loading course...</div>
            </div>
        )
        return(
            <div>
                { course }
            </div>
        )
    }
}

export default Course;