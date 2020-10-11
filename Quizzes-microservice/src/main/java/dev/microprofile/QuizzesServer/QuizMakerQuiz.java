package dev.microprofile.QuizzesServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class QuizMakerQuiz {
    private String quiz_Name;
    // private String course_ID;
    private String quiz_Creator;
    private String quiz_CourseID;
    private String[] quiz_Topics;
    private Questions[] quiz_Questions;
    private int quiz_Rating;
    private boolean star;

    public QuizMakerQuiz(){}

    public QuizMakerQuiz(JsonObject quiz){
      setQuizName(quiz.getString("quizName"));
      setQuizCreator(quiz.getString("quizCreator"));
      setQuizCourseID(quiz.getString("quizCourseID"));
      setQuizTopics(quiz.getJSONArray("quizTopics"));
      setQuizQuestions(quiz.getJSONArray("quizQuestions"));
      this.quiz_Rating = 0;
      this.star = false;
    }

    //Getters
    public void setQuizName(String qName){
      this.quiz_Name = qName;
    }
    public void setQuizCreator(String cName){
      this.quiz_Creator = cName;
    }
    public void setQuizCourseID(String cID){
      this.quiz_CourseID = cID;
    }
    public void setQuizTopics(JSONArray qTop){
      this.quiz_Topics = new String[qTop.length()];
      for(int index = 0; index<qTop.length(); index++){
        this.quiz_Topics[index] = qTop.getString(index);
      }
    }
    public void setQuizQuestions(JSONArray quests){
      this.quiz_Questions = new Questions[quests.size()-1];
      for(int index = 0; index<quests.size()-1; index++){
        quiz_Questions[index] = new Question(quests.getJSONArray(index));
      }
    }
    public void setQuizRating(int r){
      this.quiz_Rating += r;
    }
    public void setQuizStar(boolean s){
      this.star = s;
    }

    // public void setCourseID(String cID){
    //   this.course_ID = cID;
    // }
    // public void setCourseRoster(JSONArray cRost){
    //   this.course_Roster = new String[cRost.length()];
    //   for(int index = 0; index<cRost.length(); index++){
    //     this.course_Roster[index] = cRost.getString(index);
    //   }
    // }


    //Setters
    public String getQuizName(){
      return this.quiz_Name;
    }
    public String getQuizCreator(){
      return this.quiz_Creator;
    }
    // public String getCourseID(){
    //   return this.course_ID
    // }
    public String getQuizCourseID(){
      return this.quiz_CourseID;
    }
    public String[] getQuizTopics(){
      return this.quiz_Topics;
    }
    public Questions[] getQuizQuestions(){
      return this.quiz_Questions;
    }
    public int getQuizRating(){
      return this.quiz_Rating;
    }
    public boolean getStar(){
      return this.star;
    }

    public DBObject convertQuiztoDBobject(QuizMakerQuiz convertQuiz){
        return new BasicDBObject("quizName",convertQuiz.getQuizName())
        .append("quizCreator",convertQuiz.getQuizCreator())
        .append("quizCourseID",convertQuiz.getQuizCourseID())
        .append("quizTopics", convertQuiz.getQuizTopics())
        .append("quizQuestions", convertQuiz.getQuizQuestions())
        .append("quizRating", convertQuiz.getQuizRating())
        .append("quizStar", convertQuiz.getStar());
    }
}
