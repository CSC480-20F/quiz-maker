package dev.microprofile.CoursesServer;

import com.mongodb.*;
import org.bson.types.ObjectId;

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
            adding.removeField("teacher");
            courseList.add(adding);
        }
        return Response.ok(courseList.toString(), MediaType.APPLICATION_JSON).build();
    }

}
