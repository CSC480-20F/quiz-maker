package dev.microprofile.QuizzesServer;

import javax.json.JsonArray;

public class Questions{
  private String question;
  private String correct_Answer;
  private String[] incorrect_Answers;

  public Questions(){}

  public Questions(JsonArray quest){
    setQuestion(quest.getString(0));
    setCorrectAnswer(quest.getString(1));
    convertIncorrectAnswers(quest.getJsonArray(2));
  }

  //setters
  public void setQuestion(String quest){this.question = quest;}
  public void setCorrectAnswer(String cAns){this.correct_Answer = cAns;}
  public void setIncorrect_Answers(String[] incorrect_Answers) {
    this.incorrect_Answers = incorrect_Answers;
  }

  public void convertIncorrectAnswers(JsonArray iAns){
    String[] incorrect = new String[iAns.size() - 1];
    for(int index = 0; index<iAns.size()-1; index++){
      incorrect[index] = iAns.getString(index);
    }
    setIncorrect_Answers(incorrect);
  }
  //getters
  public String getQuestion(){return this.question;}
  public String getCorrectAnswer(){return this.correct_Answer;}
  public String[] getIncorrectAnswers(){return this.incorrect_Answers;}


}
