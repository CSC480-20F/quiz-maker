package dev.microprofile.CoursesServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class QuizMakerCourse {
    private String course_Name;
    // private String course_ID;
    private String course_Teacher;
    private String[] course_Roster;


    public QuizMakerCourse(JsonObject course){
      setCourseTeacher(course.getString("teacher"));
      setCourseName(course.getString("courseName"));
      setCourseRoster(course.getJsonArray("courseRoster"));
    }


    //setters
    public void setCourseName(String cName){
      this.course_Name = cName;
    }
    public void setCourseTeacher(String tName){
      this.course_Teacher = tName;
    }
    // public void setCourseID(String cID){
    //   this.course_ID = cID;
    // }
    public void setCourseRoster(JsonArray cRost){
      this.course_Roster = new String[cRost.size() - 1];
      for(int index = 0; index<cRost.size() - 1; index++){
        this.course_Roster[index] = cRost.getString(index);
      }
    }
    //getter
    public String getCourseName(){
      return this.course_Name;
    }
    public String getCourseTeacher(){
      return this.course_Teacher;
    }
    // public String getCourseID(){
    //   return this.course_ID
    // }
    public String[] getCourseRoster(){
      return this.course_Roster;
    }

    public DBObject convertCoursetoDBobject(QuizMakerCourse convertCourse){
        return new BasicDBObject("teacher",convertCourse.getCourseTeacher())
        .append("courseName",convertCourse.getCourseName())
        .append("courseRoster", convertCourse.getCourseRoster());
    }


}
