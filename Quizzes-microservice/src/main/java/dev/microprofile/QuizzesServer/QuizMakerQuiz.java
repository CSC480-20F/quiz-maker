package dev.microprofile.QuizzesServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.JsonArray;
import javax.json.JsonObject;

public class QuizMakerQuiz {
    private String quizName;
    // private String course_ID;
    private String quizCreator;
    private String quizCourseID;
    private JsonArray quizTopics;
    private JsonArray quizQuestions;
    private int quizRating;
    private boolean star;

    public QuizMakerQuiz(){}

    public QuizMakerQuiz(JsonObject quiz){
      setQuizName(quiz.getString("quizName"));
      setQuizCreator(quiz.getString("quizCreator"));
      setQuizCourseID(quiz.getString("quizCourseID"));
      setQuizTopics(quiz.getJsonArray("quizTopics"));
      setQuizQuestions(quiz.getJsonArray("quizQuestions"));
      //this.quiz_Rating = 0;
      //this.star = false;
    }

    //Setters
    public void setQuizName(String qName){
      this.quizName = qName;
    }
    public void setQuizCreator(String cName){
      this.quizCreator = cName;
    }
    public void setQuizCourseID(String cID){
      this.quizCourseID = cID;
    }
    public void setQuizTopics(JsonArray quizTopics){this.quizTopics = quizTopics;}
    public void setQuizQuestions(JsonArray questions){this.quizQuestions = questions;}
    //Later this will happen
    public void setQuizRating(int r){
      this.quizRating += r;
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


    //Getters
    public String getQuizName(){
      return this.quizName;
    }
    public String getQuizCreator(){
      return this.quizCreator;
    }
    // public String getCourseID(){
    //   return this.course_ID
    // }
    public String getQuizCourseID(){
      return this.quizCourseID;
    }
    public JsonArray getQuizTopics(){
      return this.quizTopics;
    }
    public JsonArray getQuizQuestions(){
      return this.quizQuestions;
    }
    public int getQuizRating(){
      return this.quizRating;
    }
    public boolean getStar(){
      return this.star;
    }

    public DBObject convertQuiztoDBobject(QuizMakerQuiz convertQuiz){
        return new BasicDBObject("quizName",convertQuiz.getQuizName())
        .append("quizCreator",convertQuiz.getQuizCreator())
        .append("quizCourseID",convertQuiz.getQuizCourseID())       ;
        //.append("quizTopics", convertQuiz.getQuizTopics())
        //.append("quizQuestions", convertQuiz.getQuizQuestions());
        //.append("quizRating", convertQuiz.getQuizRating())
        //.append("quizStar", convertQuiz.getStar());
    }

    //public void convertQuizTopics(JsonArray qTop){
    //    this.quizTopics = new String[qTop.size() - 1];
    //    for(int index = 0; index<qTop.size() - 1; index++){
    //        this.quizTopics[index] = qTop.getString(index);
    //    }
    //}
    //public void convertQuizQuestions(JsonArray quests){
    //    Questions[] tempQuest = new Questions[quests.size() - 1];
    //    for(int index = 0; index < quests.size() - 1; index++){
    //        tempQuest[index] = new Questions(quests.getJsonObject(index));
    //    }
    //}
}
