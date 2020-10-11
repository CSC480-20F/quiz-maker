package dev.microprofile.QuizzesServer;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class Questions{
  private String question;
  private String correct_Answer;
  private String[] incorrect_Answers;

  public Questions(){}

  public Questions(JSONArray quest){
    setQuestion(quest.getString(0));
    setCorrectAnswer(quest.getString(1));
    setIncorrectAnswers(quest.getJSONArray(2));
  }

  //setters
  public void setQuestion(String quest){this.question = quest;}
  public void setCorrectAnswer(String cAns){this.correct_Answer = cAns;}
  public void setIncorrectAnswers(JSONArray iAns){
    this.incorrect_Answers = new String[iAns.size() - 1];
    for(int index = 0; index<iAns.size()-1; index++){
      this.incorrect_Answers[index] = iAns.getString(index);
    }
  }
  //getters
  public String getQuestion(){return this.question;}
  public String getCorrectAnswer(){return this.correct_Answer;}
  public String[] getIncorrectAnswers(){return this.incorrect_Answers;}


}
