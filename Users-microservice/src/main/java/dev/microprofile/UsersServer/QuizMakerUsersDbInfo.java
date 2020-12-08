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

package dev.microprofile.UsersServer;

import com.mongodb.*;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;

@RequestScoped
@RolesAllowed({"oswego.edu"})
@Path("/users")
public class QuizMakerUsersDbInfo {
    // Creates login username and password
    MongoCredential frontendAuth = MongoCredential.createScramSha1Credential("frontend", "usersDB", "CsC480OswegoFrontendXD".toCharArray());
    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27020);
    MongoClient mongoClient = new MongoClient(serverAddress, Collections.singletonList(frontendAuth));
    //MongoClient mongoClient = new MongoClient();
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("usersDB");

    //Dumps whole db
    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump() {
        //Variable decelerations
        String dbInfo = "[";
        //Gathers the specific collection we want
        DBCollection collection = database.getCollection("users");
        //Creates a basic db object
        DBCursor cursor = collection.find();
        //Iterate through each db hit and amend it to a string
        while (cursor.hasNext()) {
            dbInfo = dbInfo.concat(cursor.next().toString());
            if (cursor.hasNext()) {
                dbInfo = dbInfo.concat(",");
            }
        }
        dbInfo = dbInfo.concat("]");
        mongoClient.close();
        return Response.ok(dbInfo, MediaType.APPLICATION_JSON).build();

    }

    //receives users email and returns list of courseIDs they are in
    @Path("/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCoursesList(@PathParam("email") String email) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("users");
        BasicDBObject query = new BasicDBObject();

        query.put("email", email);

        DBObject currentUser = collection.findOne(query);
        Object o = currentUser.get("courseId");
        mongoClient.close();
        return Response.ok(o.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET passes in the user email gets all taken quizzes
    @Path("/get-quizzes/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersQuizzesList(@PathParam("email") String email) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("users");
        BasicDBObject query = new BasicDBObject();

        query.put("email", email);

        DBObject currentUser = collection.findOne(query);
        Object o = currentUser.get("quizTaken");
        mongoClient.close();
        return Response.ok(o.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/is-instructor/{email}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Response instructorCheck(@PathParam("email") String email){
        DBCollection collection = database.getCollection("users");
        BasicDBObject query = new BasicDBObject();
        query.put("email", email);
        DBObject currentUser = collection.findOne(query);
        Object o = currentUser.get("isInstructor");
        mongoClient.close();
        return Response.ok(o.toString(), MediaType.APPLICATION_JSON).build();
    }

    //adds course to courselist for all users in that class
    @Path("/add-course")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCourse(JsonObject register){
        DBCollection collection = database.getCollection("users");
        String courseId;
        JsonArray names;
        JsonArray emails;

        courseId = register.getString("id");
        names = register.getJsonArray("names");
        emails = register.getJsonArray("emails");

        for (int i = 0; i <= emails.size() - 1; i++) {
            BasicDBObject query = new BasicDBObject();
            // System.out.println(emails.getString(i));
            // System.out.println((i));
            query.put("email",emails.getString(i));
            DBObject found = collection.findOne(query);
            if(found == null){
                QMUser freshUser = new QMUser(names.getString(i),emails.getString(i),courseId);
                collection.save(freshUser.convertUsertoDBobject(freshUser));
            }else {
                BasicDBList list = (BasicDBList)found.get("courseId");
                list.add(courseId);

                BasicDBObject foundUser = new BasicDBObject();
                DBObject update = found;
                foundUser.put("email", found.get("email").toString());
                update.put("courseId", list);
                collection.findAndModify(foundUser, update);
            }
        }
        mongoClient.close();
        return Response.ok().build();
    }

    //PUT gets email and quizID then updates quizzes taken arraylist url /quizzes-taken
    @Path("/quizzes-taken")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateQuizzesTaken(JsonObject quizTaken){
        DBCollection collection = database.getCollection("users");
        String quizId = quizTaken.getString("id");
        String email = quizTaken.getString("email");
        BasicDBObject query = new BasicDBObject();
        query.put("email", email);
        DBObject user = collection.findOne(query);
        BasicDBList quizList = (BasicDBList)user.get("quizTaken");

        if(!quizList.contains(quizId)){
          quizList.add(quizId);
          BasicDBObject foundQuiz = new BasicDBObject();
          DBObject update = user;
          update.put("quizTaken", quizList);
          foundQuiz.put("email", email);
          collection.findAndModify(foundQuiz,update);
        }
        mongoClient.close();
        return Response.ok().build();
    }
  
    @Path("/remove-from-course")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteCourse(JsonObject toRemove){
        DBCollection collection = database.getCollection("users");
        String id = toRemove.getString("id");
        JsonArray emails = toRemove.getJsonArray("emails");
        for (int i = 0; i < emails.size(); i++) {

            BasicDBObject userLookUp = new BasicDBObject();
            userLookUp.put("email", emails.getString(i));
            DBObject foundUser = collection.findOne(userLookUp);
            BasicDBList courseList = (BasicDBList)foundUser.get("courseId");
            if (courseList.contains(id)) {
                courseList.remove(id);
                foundUser.put("courseId", courseList);
                collection.findAndModify(userLookUp, foundUser);
            }
        }
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
        return Response.ok().build();
    }
}
