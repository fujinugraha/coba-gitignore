const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const member1 = "192.168.43.141:1111";
const member2 = "192.168.43.198:2222";
const member3 = "192.168.43.76:3333";

//url
const url = `mongodb://${member1},${member2},${member3}/?replicaSet=rs0`;

//db name
const dbName = "data_users";

//create a new mongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//connect to server
client.connect(err => {
  assert.equal(null, err);
  console.log("Connected correctly to server");
});

const db = client.db(dbName);

//collection
const col1 = db.collection("users_100");
const col2 = db.collection("users_1000");
const col3 = db.collection("users_10000");
const col4 = db.collection("users_100000");

app.get("/", (req, res) => {
  res.json({
    message:
      "try /mongodb/100 or /mongodb/1000 or /mongodb/10000 or /mongodb/100000"
  });
});

app.get("/mongodb/100", (req, res) => {
  console.log("request was made: " + req.url);
  col1.find().toArray((err, docs) => {
    assert.equal(null, err);
    // console.log(docs);
    res.json(docs);
  });
});

app.get("/mongodb/1000", (req, res) => {
  console.log("request was made: " + req.url);
  col2.find().toArray((err, docs) => {
    assert.equal(null, err);
    // console.log(docs);
    res.json(docs);
  });
});

app.get("/mongodb/10000", (req, res) => {
  console.log("request was made: " + req.url);
  col3.find().toArray((err, docs) => {
    assert.equal(null, err);
    // console.log(docs);
    res.json(docs);
  });
});

app.get("/mongodb/100000", (req, res) => {
  console.log("request was made: " + req.url);
  col4.find().toArray((err, docs) => {
    assert.equal(null, err);
    // console.log(docs);
    res.json(docs);
  });
});

app.get("/redis/100", (req, res) => {
  console.log("request was made: " + req.url);
  col1.find().toArray((err, docs) => {
    assert.equal(null, err);
    // console.log(docs);
    res.json(docs);
  });
});

const port = 80;
app.listen(port, "localhost");
console.log(`yo bro, server listening to port ${port}`);
