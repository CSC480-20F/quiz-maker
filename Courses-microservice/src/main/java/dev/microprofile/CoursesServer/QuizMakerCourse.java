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

package dev.microprofile.CoursesServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import java.util.ArrayList;

public class QuizMakerCourse {
    private String courseName;
    private String courseTeacher;
    private ArrayList<String> courseRoster = new ArrayList<>();
    private ArrayList<String> topics = new ArrayList<>();

    public QuizMakerCourse(){}

    public QuizMakerCourse(String course){
        String[] currentCourse = course.split(",");
        for(int i = 0; i < currentCourse.length; i++){
            if(i == 0){
                setCourseName(currentCourse[i]);
            }else if(i == 1){
                setCourseTeacher(currentCourse[i]);
            } else {
                addStudent(i - 2, currentCourse[i]);
            }
        }
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCourseTeacher(String courseTeacher) {
        this.courseTeacher = courseTeacher;
    }

    public void addStudent(int index, String student){
        this.courseRoster.add(index, student);
    }

    public String getCourseName() {
        return courseName;
    }

    public String getCourseTeacher() {
        return courseTeacher;
    }

    public ArrayList<String> getCourseRoster() {
        return courseRoster;
    }

    public DBObject convertCourse(QuizMakerCourse course){
        return new BasicDBObject().append("teacher", this.courseName)
                .append("courseName", this.courseTeacher)
                .append("courseRoster", this.courseRoster)
                .append("topics", this.topics);
    }
}
