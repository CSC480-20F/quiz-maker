package dev.microprofile.CoursesServer;

import com.mongodb.*;
import org.bson.types.ObjectId;

import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/courses")
public class QuizMakerCoursesDbInfo {
    // Creates login username and password
    MongoCredential adminAuth = MongoCredential.createScramSha256Credential("superuser", "admin", "AdminPassword123".toCharArray());
    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27018);
    MongoClient mongoClient = new MongoClient(serverAddress);
    //MongoClient mongoClient = new MongoClient(27018);
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("coursesDB");

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump(){
        //Variable decelerations
        String dbInfo="[";
        //Gathers the specific collection we want
        DBCollection collection = database.getCollection("courses");
        //Creates a basic db object
        BasicDBObject searchQuery = new BasicDBObject();
        //declaring it a search variable and setting the parameter to look for
        searchQuery.get("teacher");
        //Starting a cursor to search with our declared search variable
        DBCursor cursor = collection.find(searchQuery);
        //Iterate through each db hit and amend it to a string
        while (cursor.hasNext()) {
            dbInfo = dbInfo.concat(cursor.next().toString());
            if (cursor.hasNext()){
                dbInfo = dbInfo.concat(",");
            }
        }
        dbInfo = dbInfo.concat("]");
        return Response.ok(dbInfo, MediaType.APPLICATION_JSON).build();

    }

    @Path("/testing-input")
    @POST
    @Consumes("application/json")
    public Response testingInput(JsonObject test){
        DBCollection collection = database.getCollection("courses");
       /* JsonObjectBuilder builder = Json.createObjectBuilder();
        for (String key: test.keySet()){
            builder.add(key, test.get(key));
        } */
        QuizMakerCourse course = new QuizMakerCourse(test);
        collection.save(course.convertCoursetoDBobject(course));
        return Response.ok().build();
    }

    @Path("/get-courses/{courseId}")
    @GET
    @Consumes("application/json")
    public Response getCourseNames(@PathParam("courseId") String courseId){
        DBCollection collection = database.getCollection("courses");
        BasicDBObject courseList = new BasicDBObject();
        //Start loop
        //parse couresId
        DBObject currentCourse = collection.findOne(new ObjectId(courseId));
        currentCourse.get("courseName");
        currentCourse.get("profName");
        //append above info to out going string
        //finish loop
        //send out going string
        return Response.ok().build();
    }

}
