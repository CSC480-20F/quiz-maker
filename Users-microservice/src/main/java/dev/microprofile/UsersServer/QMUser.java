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
