package dev.microprofile.QuestionsServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class QMQuestion {
    private String category;
    private String question;
    private String correct_answer;
    private String teacher;
    private String student;
    private String quiz_Name;
    private String quiz_ID;
    private String incorrect_answer;
    private boolean starred;
    private int rating;

    public QMQuestion(){}

    public QMQuestion(JsonObject quest){
      this.category = quest.getString("category");
      this.question = quest.getString("question");
      this.correct_answer = quest.getString("correct_answer");
      this.teacher = quest.getString("teacher");
      this.student = quest.getString("student");
      this.quiz_Name = quest.getString("quiz_Name");
      this.quiz_ID = quest.getString("quiz_ID");
      setIncorrectAnswers(quest.getJSONArray("incorrect_answer"));
      this.starred = quest.getBoolean("star");
      this.rating = quest.getInt("rating");
    }

    public String getCategory() {
      return this.category;
    }
    public String getQuestion() {
      return this.question;
    }
    public String getCorrectAnswer() {
      return this.correct_answer;
    }
    public String getTeacher() {
      return this.teacher;
    }
    public String getStudent() {
      return this.student;
    }
    public String getQuizName() {
      return this.quiz_Name;
    }
    public String getQuizID() {
      return this.quiz_ID;
    }
    public String[] getIncorrectAnswers(){
      return this.incorrect_answer;
    }
    public boolean getStar() {
      return this.starred;
    }
    public int getRating() {
      return this.rating;
    }

    public void setCategory(String cat){
      this.category = cat;
    }
    public void setQuestion(String ques){
      this.question = ques;
    }
    public void setCorrectAnswer(String corAns){
      this.correct_answer = corAns;
    }
    public void setTeacher(String teach){
      this.teacher = teach;
    }
    public void setStudent(String stud){
      this.student = stud;
    }
    public void setQuizName(String QName){
      this.quiz_Name = QName;
    }
    public void setQuizID(String QID){
      this.quiz_ID = QID;
    }
    public void setIncorrectAnswers(JSONArray incAns){
      this.incorrect_answer = new String[incAns.length];
      for(int index = 0; index<incAns.length; inde++){
        this.incorrect_answer[index] = incAns.getString(index);
      }
    }
    public void setStar(boolean star){
      this.starred = star;
    }
    public int setRating(int rat){
      this.rating += rat;
    }

    public DBObject convertQuestiontoDBobject(QMQuestion convertQuestion){
        return new BasicDBObject("category",convertQuestion.getCategory())
        .append("question",convertQuestion.getQuestion())
        .append("correct_answer",convertQuestion.getCorrectAnswer())
        .append("teacher", convertQuestion.getTeacher())
        .append("student", convertQuestion.getStudent())
        .append("quiz_Name", convertQuestion.getQuizName())
        .append("quiz_ID", convertQuestion.getQuizID())
        .append("incorrect_answer", convertQuestion.getIncorrectAnswers())
        .append("star", convertQuestion.getStar())
        .append("rating", convertQuestion.getRating());
    }

}
