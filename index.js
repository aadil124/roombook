import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

//username
const username = `itaadil124`
const pass_code = `6zuy1i1ZlrL5Fchv`

//set the mongodb url and port number
const MONGO_URL =
  `mongodb+srv://${username}:${pass_code}@cluster0.k17mdfz.mongodb.net/`;

const PORT = 4000;

//create instance of the express application
const app = express();

//add middleware to parse the json request
app.use(express.json()); // we can use body-parser also

//enable cross origin resource sharing (CORS)
app.use(cors());

//Function to create to connect to mongodb database

const createConnection = async () => {
  //create a new mongoclient instance by supplying mongourl
  const client = new MongoClient(MONGO_URL);

  //connect to mongodb server
  await client.connect();

  //print message
  console.log("Connection to Mongodb server is established");

  return client;
};

//create a mongodb client by calling createConnection

const client = createConnection();

//create a basic router operation
//Route for homepage
app.get("/", (req, res) => {
  res.send("<h1>Server is working</h1>");
});

//creating rooms
app.post("/create_room", async(req,res)=>{
//retrieve the room data from req. body
const data = req.body
//insert the room data into the create_room collection db-booking
const result = await client.db("booking").collection("create_room").insert(data)

//check if the insertion is done or not
if (result.acknowledged) {
    res.status(200).send({msg:"Rooms are created successfully!"})
} else {
    res.status(400).send({msg:"Something went wrong! Please try again later"})
}
})


app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
