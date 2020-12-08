// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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