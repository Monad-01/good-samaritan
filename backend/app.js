const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const knexfile = require("./knexfile");
const knex = require("knex")(knexfile.development);

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(bodyParser());
app.use(express.static("/../frontend"));

app.get("/pirates", async function (request, response) {
  const pirates = await knex.select("*").from("pirates");
  response.json(pirates);
});

app.post("/pirates", async function (request, response) {
  const newPirate = { name: request.body.name };
  console.log(newPirate);
  await knex("pirates").insert(newPirate);

  io.emit("new-pirate", newPirate);
  response.json(newPirate);
});

app.get("/users", async function (request, response) {
  const users = await knex.select("*").from("users");
  response.json(users);
});

app.post("/users", async function (request, response) {
  const newUser = {
    name: request.body.name,
    email: request.body.email,
    hashedPassword: await bcrypt.hash(request.body.password, 10),
  };

  //Make sure to add validations later

  let user = await knex("users").insert(newUser);

  response.json(newUser);
});

//I recieve the list of nearby zipcodes,
//I use a forEach function with those zipcodes,
//To call knex.("questions").where("zipcode", *zipcode*)
//And shovel that into an array using a spread function in there
//And then respond with the filtered list of questions

//IT FUCKING WORKS

app.post("/questions", async function (request, response) {
  const zipcodes = request.body.zipcodes;

  let filteredQuestions = [];

  let addToArr = async (zipcode) => {
    await knex
      .select("*")
      .from("questions")
      .where("zipcode", zipcode)
      .then((resp) => {
        resp.forEach((resp) => {
          if (resp) {
            filteredQuestions.push(resp);
          }
        });
      });
  };

  let filterZipcodes = async () => {
    await zipcodes.forEach(async (zipcode) => {
      addToArr(zipcode);
    });
  };
  filterZipcodes();

  setTimeout(() => {
    response.json({ questions: filteredQuestions });
  }, 3000);
});

app.post("/get-comments", async function (request, response) {
  let question_id = request.body.question_id;
  console.log("This was the question id I received", question_id);

  let comment = await knex
    .select("*")
    .from("comments")
    .where("question_id", question_id);

  setTimeout(() => {
    response.json({ comments: comment });
  }, 1000);
});

app.post("/new-question", async function (request, response) {
  console.log("I submitted a question");
  let question = request.body;

  console.log(question);

  await knex("questions").insert(question);

  io.emit("new-question", question);
  response.json(question);
});

app.post("/new-comment", async function (request, response) {
  console.log("I submitted a comment");
  let comment = request.body.comment;

  await knex("comments").insert(comment);

  io.emit("new-comment", comment);
  response.json(comment);
});

app.post("/authenticate", async function (request, response) {
  const passedUser = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.email,
  };

  user = await knex("users").where("name", passedUser.name);

  bcrypt.compare(request.body.password, user[0].hashedPassword, function (
    err,
    res
  ) {
    if (res == true) {
      console.log("Facts");
      response.json({
        success: true,
        id: user[0].id,
        name: user[0].name,
        errors: null,
      });
    } else {
      console.log("small");
      response.json({ success: false, id: null, name: null, errors: true });
    }
  });
});

console.log("I have started");
http.listen(1337);
