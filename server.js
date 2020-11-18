// Dependencies 
const express = require("express");
const fs = require("fs");
const path = require("path");

// Sets up the Express App
const app = express()
const PORT = process.env.PORT || 3000;

// Set up the Express ass to handel data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
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


  // Create New note - takes in JSON input
  app.post("/api/notes", (req, res) => {
    newNote = req.body;

    fs.readFile((__dirname, + "/db/db.json",(err,data)=>{
      var json = JSON.parse(data);
      JSON.push(newNote);


      fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));

    }));
   
  });


  //DELETE route
  app.delete("/api/notes/:id", (req, res) => {
    let response = req.params;
    let id = response.id;

    fs.readFile(__dirname + "/db/db.json", (err,data)=>{
      var json = JSON.parse(data);

      const filtereJSON = json.filter((element)=> elemnent.id !==id);

      fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(filtereJSON));
    })

  });

  // Starts the server to begin listening
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
