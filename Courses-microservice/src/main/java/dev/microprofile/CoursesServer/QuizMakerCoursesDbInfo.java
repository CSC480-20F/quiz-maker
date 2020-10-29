package dev.microprofile.CoursesServer;

import com.mongodb.*;
import org.bson.types.ObjectId;

import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;


@Path("/courses")
public class QuizMakerCoursesDbInfo {
    // Creates login username and password
    MongoCredential adminAuth = MongoCredential.createScramSha256Credential("superuser", "admin", "AdminPassword123".toCharArray());
    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    ServerAddress serverAddress = new ServerAddress("129.3.20.26", 27018);
    MongoClient mongoClient = new MongoClient(serverAddress);
    //Connects to the specific db we want;
    DB database = mongoClient.getDB("coursesDB");

    //Dumps whole db
    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump(){
        //Variable decelerations
        String dbInfo="[";
        //Gathers the specific collection we want
        DBCollection collection = database.getCollection("courses");
        DBCursor cursor = collection.find();
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

    //Creates Course and send back courseID
    @Path("/create-course/{course}")
    @GET
    @Consumes("application/json")
    public Response testingInput(@PathParam("course") String incoming){
        //Create a course
        DBCollection collection = database.getCollection("courses");
        QuizMakerCourse currentCourse = new QuizMakerCourse(incoming);
        DBObject courseIn = currentCourse.convertCourse(currentCourse);
        //Save and send course id back
        collection.save(courseIn);
        ObjectId id = (ObjectId)courseIn.get("_id");

        return Response.ok(id.toString(), MediaType.APPLICATION_JSON).build();
    }

    //Recieves list of courseIDs and returns those courses
    @Path("/get-courses/{courseId}")
    @GET
    @Consumes("application/json")
    public Response getCourseNames(@PathParam("courseId") String courseId){

        DBCollection collection = database.getCollection("courses");
        String[] course = courseId.split(",");
        Object courseName;
        Object teacher;
        ArrayList<DBObject> courses = new ArrayList<>();
        for (int i = 0; i < course.length; i++) {
            DBObject currentCourse = collection.findOne(new ObjectId(course[i]));
            currentCourse.removeField("courseRoster");
            courses.add(currentCourse);
        }
        //courseOut = courseOut.concat("]");
        return Response.ok(courses.toString(), MediaType.APPLICATION_JSON).build();
    }

    //GET accepts email and returns all courses that user is a instructor
    @Path("/get-instructor-courses/{email}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Response listInstructorCourses(@PathParam("email") String email){

        DBCollection collection = database.getCollection("courses");
        BasicDBObject query = new BasicDBObject();
        ArrayList<DBObject> courseList = new ArrayList<>();
        query.put("teacher", email);

        DBCursor instructor = collection.find(query);
        while (instructor.hasNext()){
            DBObject adding = instructor.next();
            adding.removeField("courseRoster");
            courseList.add(adding);
        }
        return Response.ok(courseList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //needs testing
    //adds topics to course
    @Path("/add-topics")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCourse(JsonObject topics){
        DBCollection collection = database.getCollection("courses");
        String courseId = topics.getString("courseID");
        JsonArray topicArray = topics.getJsonArray("topics");

        DBObject course = collection.findOne(new ObjectId(courseId));
        BasicDBList topicsList = (BasicDBList)course.get("topics");

        for(int index = 0; index < topicArray.size(); index++){
            String topic = topicArray.getString(index);
            if(!topicsList.contains(topic)) {
                topicsList.add(topic);
            }
        }

        BasicDBObject foundCourse = new BasicDBObject();
        course.put("topics", topicsList);
        foundCourse.put("_id", new ObjectId(courseId));
        collection.findAndModify(foundCourse, course);
        return Response.ok().build();
    }

    @Path("/update-topics")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateTopics(JsonObject freshTopics){
        DBCollection collection = database.getCollection("courses");
        String id = freshTopics.getString("courseID");
        DBObject foundCourse = collection.findOne(new ObjectId(id));

        BasicDBList convertList = new BasicDBList();
        for (JsonValue value :freshTopics.getJsonArray("topics")) {
            convertList.add(value.toString().replace('"',' ').trim());

        }

        foundCourse.put("topics", convertList);
        System.out.println(foundCourse.toString());
        BasicDBObject currentCourse = new BasicDBObject();
        currentCourse.put("_id", new ObjectId(id));
        collection.findAndModify(currentCourse, foundCourse);
        return Response.ok().build();
    }

}
