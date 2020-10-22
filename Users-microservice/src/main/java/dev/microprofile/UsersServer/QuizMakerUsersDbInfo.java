package dev.microprofile.UsersServer;

import com.mongodb.*;
import org.bson.types.ObjectId;

import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/users")
public class QuizMakerUsersDbInfo {
    // Creates login username and password
    MongoCredential adminAuth = MongoCredential.createScramSha256Credential("superuser", "admin", "AdminPassword123".toCharArray());
    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27017);
    MongoClient mongoClient = new MongoClient(serverAddress);
    //MongoClient mongoClient = new MongoClient();
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("testing");

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

        return Response.ok(o.toString(), MediaType.APPLICATION_JSON).build();
    }

    //needs testing
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
        Object o = currentUser.get("takenQuizzes");

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

        return Response.ok().build();
    }

    //needs testing
    //PUT gets email and quizID then updates quizzes taken arraylist url /quizzes-taken
    @Path("/quizzes-taken")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateQuizzesTaken(JsonObject quizTaken){
        DBCollection collection = database.getCollection("users");
        String quizId = quizTaken.getString("id");
        String email = quizTaken.getString("email");

        DBObject user = collection.findOne(new ObjectId(email));
        BasicDBList quizList = (BasicDBList)user.get("takenQuizzes");

        if(!quizList.contains(quizId)){
          quizList.add(quizId);
          BasicDBObject foundQuiz = new BasicDBObject();
          DBObject update = user;
          update.put("takenQuizzes", quizList);
          foundQuiz.put("email", email);
          collection.findAndModify(foundQuiz,update);
        }
        return Response.ok().build();
    }

}
