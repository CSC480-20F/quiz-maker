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
