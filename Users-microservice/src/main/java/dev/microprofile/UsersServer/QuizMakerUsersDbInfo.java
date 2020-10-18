package dev.microprofile.UsersServer;

import com.mongodb.*;

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

    @Path("/testing-input")
    @POST
    @Consumes("application/json")
    public Response testingInput(JsonObject test) {
        DBCollection collection = database.getCollection("users");
       /* JsonObjectBuilder builder = Json.createObjectBuilder();
        for (String key: test.keySet()){
            builder.add(key, test.get(key));
        } */
        QMUser user = new QMUser(test);
        collection.save(user.convertUsertoDBobject(user));
        return Response.ok().build();
    }

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
}
