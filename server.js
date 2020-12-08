// Dependencies 
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');



// Sets up the Express App
const app = express()
const PORT = process.env.PORT || 3001;

// Set up the Express ass to handel data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Create New note - takes in JSON input
app.post("/api/notes/", (req, res) => {
  let newNote = {id: uuidv4(), ...req.body}
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);
    json.push(newNote);
    console.log(json)

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));

  });
  
});

//DELETE route
app.delete("/api/notes/:id", (req, res) => {
  let response = req.params;
  let id = response.id;
  console.log(`Note id: ${id} marked for deletion`);

  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);

    const filtereJson = json.filter((element) => element.id !== id);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(filtereJson));
  });
});


app.get("/api/notes/", function (req, res) {
  // Read the db file so we can put it on a page
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    // Parse our db.json data
    var json = JSON.parse(data);
    return res.json(json);
  })
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App started on " + PORT);
});
