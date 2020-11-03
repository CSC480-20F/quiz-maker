package dev.microprofile.QuizzesServer;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;

import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Collections;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


@Path("/quizzes")
public class QuizMakerQuizzesDbInfo {
    // Creates login username and password
    MongoCredential frontendAuth = MongoCredential.createScramSha1Credential("frontend", "quizzesDB", "CsC480OswegoFrontendXD".toCharArray());    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27019);
    CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
        fromProviders(PojoCodecProvider.builder().register(QuizMakerQuiz.class).automatic(true).build()));
    MongoClient mongoClient = new MongoClient(serverAddress, Collections.singletonList(frontendAuth));
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
          //System.out.println(questions.toString());
          int questSize = questions.size();
          quiz.removeField("quizQuestions");
          quiz.put("quiz-length", questSize);
          quizList.add(quiz);
        }

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
        int rate;

        quizId = quizTaken.getString("id");
        rate = quizTaken.getInt("rating");

        DBObject quiz = collection.findOne(new ObjectId(quizId));
        BasicDBObject foundQuiz = new BasicDBObject();
        rate += (int)quiz.get("rating");
        quiz.put("rating", rate);
        //System.out.println(update.toString());
        foundQuiz.put("_id", new ObjectId(quizId));
        collection.findAndModify(foundQuiz, quiz);
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
        return Response.ok().build();
    }

    @Path("/course-starred-quizzes/{courseID}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateStar(@PathParam("courseID") String courseID){
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


        //System.out.println(query.toString());
        return Response.ok(starredQuizzes.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/populate-database-for-testing")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response populateDB(JsonArray mockData){
        DBCollection collection = database.getCollection("quizzes");
        int badQuizzes = 1;
        BulkWriteOperation bulk = collection.initializeUnorderedBulkOperation();

        for (JsonValue mockQuiz: mockData) {
            if(badQuizzes > 2) {
                DBObject o = BasicDBObject.parse(mockQuiz.toString());
                bulk.insert(o);
            }
            badQuizzes++;
        }
        bulk.execute();

        return Response.ok().build();
    }
}
