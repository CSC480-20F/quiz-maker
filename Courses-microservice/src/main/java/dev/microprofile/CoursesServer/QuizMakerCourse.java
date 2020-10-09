package dev.microprofile.CoursesServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.Json;
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
      setCourseRoster(course.getJSONArray("courseRoster"));
    }
    //Getters
    public void setCourseName(String cName){
      this.course_Name = cName;
    }
    public void setCourseTeacher(String tName){
      this.course_Teacher = tName;
    }
    // public void setCourseID(String cID){
    //   this.course_ID = cID;
    // }
    public void setCourseRoster(JSONArray cRost){
      this.course_Roster = new String[cRost.length()];
      for(int index = 0; index<cRost.length(); index++){
        this.course_Roster[index] = cRost.getString(index);
      }
    }
    //Setters
    public String getCourseName(){
      return this.course_Name;
    }
    public String getCourseTeacher(){
      return this.course_Teacher;
    }
    // public String getCourseID(){
    //   return this.course_ID
    // }
    public String getCourseRoster(){
      return this.course_Roster;
    }

    public DBObject convertCoursetoDBobject(QuizMakerCourse convertCourse){
        return new BasicDBObject("courseName",convertCourse.getCourseName())
        .append("courseTeacher",convertCourse.getCourseTeacher())
        .append("courseRoster", convertCourse.getCourseRoster());
    }


}
