// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package dev.microprofile.QuizzesServer;

import com.mongodb.*;
import org.bson.types.ObjectId;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Collections;

@RequestScoped
@RolesAllowed({"oswego.edu"})
@Path("/quizzes")
public class QuizMakerQuizzesDbInfo {
    // Creates login username and password
    MongoCredential frontendAuth = MongoCredential.createScramSha1Credential("frontend", "quizzesDB", "CsC480OswegoFrontendXD".toCharArray());    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27019);
    MongoClient mongoClient = new MongoClient(serverAddress, Collections.singletonList(frontendAuth));
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("quizzesDB");

    //Dumps whole db
    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump(){
        //Variable decelerations
        String dbInfo="";
        //Gathers the specific collection we want
        DBCollection collection = database.getCollection("quizzes");
        //Starting a cursor to search with our declared search variable
        DBCursor cursor = collection.find();
        //Iterate through each db hit and amend it to a string
        dbInfo = dbInfo.concat("[");
        while (cursor.hasNext()) {
            dbInfo = dbInfo.concat(cursor.next().toString());
            if (cursor.hasNext()){
                dbInfo = dbInfo.concat(",");
            }
        }
        dbInfo = dbInfo.concat("]");
        mongoClient.close();
        return Response.ok(dbInfo, MediaType.APPLICATION_JSON).build();
    }

    //GET passes users email returns all quizzes created by them
    @Path("/get-created-quizzes/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCreatedQuizzesList(@PathParam("email") String email) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        BasicDBObject query = new BasicDBObject();

        query.put("creator", email);
        DBCursor currentQuiz = collection.find(query);
        ArrayList<DBObject> quizList = new ArrayList<>();

        while (currentQuiz.hasNext()) {
          DBObject quiz = currentQuiz.next();
          BasicDBList questions = (BasicDBList) quiz.get("quizQuestions");
          int questSize = questions.size();
          quiz.removeField("quizQuestions");
          quiz.put("quiz-length", questSize);
          quizList.add(quiz);
        }
        mongoClient.close();
        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET passes a courseID returns all quizzes in that course
    @Path("/get-course/{courseId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCoursesList(@PathParam("courseId") String courseId) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        BasicDBObject query = new BasicDBObject();

        query.put("courseID", courseId);
        DBCursor currentQuiz = collection.find(query);
        ArrayList<DBObject> quizList = new ArrayList<>();

        while (currentQuiz.hasNext()) {
          DBObject cq = currentQuiz.next();
          BasicDBList questions = (BasicDBList) cq.get("quizQuestions");
          int questSize = questions.size();
          cq.removeField("quizQuestions");
          cq.put("quiz-length", questSize);
          quizList.add(cq);
        }
        mongoClient.close();
        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET passes list of quizIDs returns those quizzes info
    @Path("/get-quizzes/{quizIds}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response quizzesList(@PathParam("quizIds") String quizIds) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        String[] quizArray = quizIds.split(",");
        ArrayList<DBObject> quizList = new ArrayList<>();
        for (int index = 0; index < quizArray.length; index++){
          //search for quiz id
          DBObject quiz = collection.findOne(new ObjectId(quizArray[index]));
          //gets quiz id in DBObject quiz
          BasicDBList questions = (BasicDBList) quiz.get("quizQuestions");
          int questSize = questions.size();
          quiz.removeField("quizQuestions");
          quiz.put("quiz-length", questSize);
          quizList.add(quiz);
        }
        mongoClient.close();
        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET passes us one quiz ID returns the full quiz
    @Path("/get-quiz/{quizId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOneQuiz(@PathParam("quizId") String quizId) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        DBObject quiz = collection.findOne(new ObjectId(quizId));
        mongoClient.close();
        return Response.ok(quiz.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/course-starred-quizzes/{courseID}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Response starredCourses(@PathParam("courseID") String courseID){
        DBCollection collection = database.getCollection("quizzes");
        BasicDBObject query = new BasicDBObject();
        ArrayList<DBObject> starredQuizzes = new ArrayList<>();
        query.put("courseID", courseID);
        DBCursor foundCourse = collection.find(query);
        while (foundCourse.hasNext()){
            DBObject fC = foundCourse.next();
            if(fC.get("starred").equals(true)){
                starredQuizzes.add(fC);
            }
        }
        mongoClient.close();
        return Response.ok(starredQuizzes.toString(), MediaType.APPLICATION_JSON).build();
    }

    //POST adds a quiz to db
    @Path("/add-quiz")
    @POST
    @Consumes("application/json")
    public Response testingInput(JsonObject fuck){
        DBCollection collection = database.getCollection("quizzes");
        DBObject o = BasicDBObject.parse(fuck.toString());
        collection.save(o);
        mongoClient.close();
        return Response.ok().build();
    }

    //PUT gets quizID and rating int. Updates rating on quiz
    @Path("/update-rating")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCourse(JsonObject quizTaken){
        DBCollection collection = database.getCollection("quizzes");
        String quizId;
        int rate;

        quizId = quizTaken.getString("id");
        rate = quizTaken.getInt("rating");

        DBObject quiz = collection.findOne(new ObjectId(quizId));
        BasicDBObject foundQuiz = new BasicDBObject();
        rate += (int)quiz.get("rating");
        quiz.put("rating", rate);
        foundQuiz.put("_id", new ObjectId(quizId));
        collection.findAndModify(foundQuiz, quiz);
        mongoClient.close();
        return Response.ok().build();
    }

    @Path("/update-star")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateStar(JsonObject quizID){
        DBCollection collection = database.getCollection("quizzes");
        DBObject query = collection.findOne(new ObjectId(quizID.getString("id")));
        BasicDBObject foundQuiz = new BasicDBObject();
        foundQuiz.put("_id", new ObjectId(quizID.getString("id")));
        if(query.get("starred").equals(false)){
            query.put("starred", true);
        }else {
            query.put("starred", false);
        }

        System.out.println(query.toString());
        collection.findAndModify(foundQuiz, query);
        mongoClient.close();
        return Response.ok().build();
    }

    @Path("/delete-taken-quizzes")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteTakenQuizzes(JsonObject quizTaken){
        System.out.println(quizTaken.toString());
        DBCollection collection = database.getCollection("users");
        String quizId = quizTaken.getString("id");
        JsonArray emails = quizTaken.getJsonArray("emails");
        for(JsonValue j: emails) {
            BasicDBObject query = new BasicDBObject();
            query.put("email", j);
            DBObject user = collection.findOne(query);
            BasicDBList quizList = (BasicDBList) user.get("quizTaken");

            if (quizList.contains(quizId)) {
                quizList.remove(quizId);
                BasicDBObject foundQuiz = new BasicDBObject();
                DBObject update = user;
                update.put("quizTaken", quizList);
                foundQuiz.put("email", j);
                collection.findAndModify(foundQuiz, update);
            }
        }
        mongoClient.close();
        return Response.ok().build();
    }
}
