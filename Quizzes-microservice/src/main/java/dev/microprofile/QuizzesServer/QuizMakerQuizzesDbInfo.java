package dev.microprofile.QuizzesServer;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


@Path("/quizzes")
public class QuizMakerQuizzesDbInfo {
    // Creates login username and password
    MongoCredential adminAuth = MongoCredential.createScramSha256Credential("superuser", "admin", "AdminPassword123".toCharArray());
    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27019);
    CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
        fromProviders(PojoCodecProvider.builder().register(QuizMakerQuiz.class).automatic(true).build()));
    MongoClient mongoClient = new MongoClient(serverAddress);
    //MongoClient mongoClient = new MongoClient(27018);
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("quizzesDB");
    MongoDatabase  db = mongoClient.getDatabase("quizzesDB");

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
        DBCursor cursor = collection.find(searchQuery);
        //Iterate through each db hit and amend it to a string
        dbInfo = dbInfo.concat("[");
        while (cursor.hasNext()) {
            dbInfo = dbInfo.concat(cursor.next().toString());
            if (cursor.hasNext()){
                dbInfo = dbInfo.concat(",");
            }
        }
        dbInfo = dbInfo.concat("]");
        return Response.ok(dbInfo, MediaType.APPLICATION_JSON).build();
    }


    //needs testing
    //GET passes users email returns all quizzes created by them
    @Path("/get-created-quizzes/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCoursesList(@PathParam("email") String email) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        BasicDBObject query = new BasicDBObject();

        query.put("creator", email);

        DBCursor currentQuiz = collection.find(query);
        ArrayList<DBObject> quizList = new ArrayList<>();

        while (currentQuiz.hasNext()) {
          DBObject quiz = currentQuiz.next();
          BasicDBList questions = (BasicDBList) quiz.get("questions");
          int questSize = questions.size();
          quiz.removeField("questions");
          quiz.put("quiz-length", questSize);
          quizList.add(quiz);
        }

        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET passes a courseID returns all quizzes in that course
    @Path("/get-quizzes/{courseId}")
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
          BasicDBList questions = (BasicDBList) cq.get("questions");
          //int questSize = questions.size() - 1;
          cq.removeField("questions");
          //cq.put("quiz-length", questSize);
          quizList.add(cq);
        }

        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //needs testing
    //GET passes list of quizIDs returns those quizzes info
    @Path("/get-quizzes/{quizIds}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCoursesList(@PathParam("quizIds") String quizIds) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        String[] quizArray = quizIds.split(",");
        ArrayList<DBObject> quizList = new ArrayList<>();
        for (int index = 0; index < quizArray.length(); index++){
          //search for quiz id
          DBObject quiz = collection.findOne(new ObjectId(quizArray[index]));
          //gets quiz id in DBObject quiz
          BasicDBList questions = (BasicDBList) quiz.get("questions");
          int questSize = questions.size();
          quiz.removeField("questions");
          quiz.put("quiz-length", questSize);
          quizList.add(cq);
        }
        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //needs testing
    //GET passes us one quiz ID returns the full quiz
    @Path("/get-quiz/{quizId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response usersCoursesList(@PathParam("quizId") String quizId) {
        //db connection and local var statements
        DBCollection collection = database.getCollection("quizzes");
        DBObject quiz = collection.findOne(new ObjectId(quizId));
        return Response.ok(quiz.toString(), MediaType.APPLICATION_JSON).build();
    }

    //adds a quiz to db
    @Path("/add-quiz")
    @POST
    @Consumes("application/json")
    public Response testingInput(JsonObject fuck){
        DBCollection collection = database.getCollection("quizzes");
        DBObject o = BasicDBObject.parse(fuck.toString());
        collection.save(o);
        return Response.ok().build();
    }


    //needs testing
    //PUT gets quizID and rating int. Updates rating on quiz
    @Path("/update-rating")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCourse(JsonObject quizTaken){
        DBCollection collection = database.getCollection("quizzes");
        String quizId;
        String rate;

        quizId = quizTaken.getString("id");
        rate = quizTaken.getString("rating");
        DBObject quiz = collection.findOne(new ObjectId(quizId));
        BasicDBObject foundQuiz = new BasicDBObject();
        DBObject update = quiz;
        update.put("rating", rate);
        foundQuiz.put("_id", quizId);
        collection.findAndModify(foundQuiz,update);

        return Response.ok().build();
    }


}
