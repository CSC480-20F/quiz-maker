import React, { useContext } from 'react';
import InstructorCourses from './InstructorCourses';
import MyCourses from './MyCourses';
import TopNavbar from './TopNavbar';
import {UserContext} from '../context/UserContext';

const Courses = () => {
    const teacher = useContext(UserContext).isInstructor

    const view = teacher ? (
        <>
        <h1 className='subtitle'> Courses where I am a professor </h1>
        <InstructorCourses limit="null"/>
        <div style={{padding: '10px'}}></div>
        </>
    ):(
        <></>
    )
    return (
        <div>
            <div> <TopNavbar/> </div>
            
            <div className="container-middle">
            <div className="header"> Courses </div>

            <div style={{padding: '10px'}}> </div>
                <div className='container'>
                    {view}
                    <h1 className='subtitle'> Courses where I am a student </h1>
                    <MyCourses limit="null"/>
                    <div style={{padding: '10px'}}></div>
                </div>
            </div>
        </div>
    )
}

export default Courses;