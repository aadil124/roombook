import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

//set the mongodb url and port number
const MONGO_URL =
  "mongodb+srv://itaadil124:6zuy1i1ZlrL5Fchv@cluster0.k17mdfz.mongodb.net/";

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

//creating room

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
