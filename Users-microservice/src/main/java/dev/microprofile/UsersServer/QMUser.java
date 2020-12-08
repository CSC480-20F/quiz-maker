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

package dev.microprofile.UsersServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import java.util.ArrayList;

public class QMUser {
    private String name;
    private String email;
    private boolean isInstructor;
    private ArrayList<String> courseId = new ArrayList<>();
    private ArrayList<String> takenQuizzes = new ArrayList<>();

    public QMUser(String name, String email, String courseId){
        this.name = name;
        this.email = email;
        this.courseId.add(courseId);
        this.isInstructor = false;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addCourseId(String id){
        this.courseId.add(id);
    }

    public void addQuizId(String id){
        this.takenQuizzes.add(id);
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public ArrayList<String> getCourseId() {
        return courseId;
    }

    public DBObject convertUsertoDBobject(QMUser convertUser){
        return new BasicDBObject().append("name", this.name)
                .append("email", this.email)
                .append("courseId", this.courseId)
                .append("quizTaken",this.takenQuizzes)
                .append("isInstructor", this.isInstructor);
    }
}
