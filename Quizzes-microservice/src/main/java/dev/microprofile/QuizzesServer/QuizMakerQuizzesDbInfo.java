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


    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump(){
        //Variable decelerations
        String dbInfo="";
        //Gathers the specific collection we want
        DBCollection collection = database.getCollection("quizzes");
        //Creates a basic db object
        BasicDBObject searchQuery = new BasicDBObject();
        //declaring it a search variable and setting the parameter to look for
        searchQuery.get("quizName");
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
          BasicDBList questions = (BasicDBList) cq.get("quizQuestions");
          int questSize = questions.size();
          cq.removeField("quizQuestions");
          cq.put("quizLength", questSize);
          quizList.add(cq);
        }

        return Response.ok(quizList.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/testing-input")
    @POST
    @Consumes("application/json")
    public Response testingInput(JsonObject fuck){
        DBCollection collection = database.getCollection("quizzes");
       /* JsonObjectBuilder builder = Json.createObjectBuilder();
        for (String key: test.keySet()){
            builder.add(key, test.get(key));
        } */
        // QuizMakerQuiz quiz = new QuizMakerQuiz(fuck);
        //get timestamp

        DBObject o = BasicDBObject.parse(fuck.toString());
        collection.save(o);
        return Response.ok().build();
    }

}
