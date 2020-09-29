package dev.microprofile.DBServer;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class QMUser {
    private String fname;
    private String lname;
    private int age;
    private String major;

    public QMUser(){
    }

    public QMUser(JsonObject user){
        this.fname = user.getString("fname");
        this.lname = user.getString("lname");
        this.age = user.getInt("age");
        this.major = user.getString("major");
    }

    public String getFname(){
        return fname;
    }

    public String getLname(){
        return lname;
    }
    public int getAge(){
        return age;
    }
    public String getMajor(){
        return major;
    }
    public void setFname(String fname){
        this.fname = fname;
    }
    public void setLname(String lname){
        this.lname = lname;
    }
    public void setAge(int age){
        this.age = age;
    }
    public void setMajor(String major){
        this.major = major;
    }


    public DBObject convertUsertoDBobject(QMUser convertUser){
        return new BasicDBObject("fname",convertUser.getFname()).append("lname",convertUser.lname).append("age", convertUser.getAge()).append("major", convertUser.getMajor());
    }
}
