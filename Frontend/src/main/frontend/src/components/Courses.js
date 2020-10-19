import React from 'react';
import MyCourses from './MyCourses';
import TopNavbar from './TopNavbar';

const Courses = () => {
    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Courses </div>

            <div style={{padding: '10px'}}> </div>
                <div className='container'>
                    <h1 className='subtitle'> Courses where I am a student </h1>
                    <MyCourses limit="null"/>
                    <div style={{padding: '10px'}}></div>
                </div>
    
            </div>
        </div>
    )
}

export default Courses;