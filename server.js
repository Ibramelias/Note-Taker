// Dependencies 
const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const notes = require("./db/db.json");

// Sets up the Express App
const app = express()
const PORT = process.env.PORT || 3000;

// Set up the Express ass to handel data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Notes (DATA)
var notes = [
    {
      routeName: "day1",
      name: "Day one",
      text: "College Time",
    },
    {
      routeName: "day2",
      name: "Day two",
      text: "Work Time",
    },
    {
      routeName: "day3",
      name: "Day three",
      text: "Shopping Time",
    }
  ];

  // Basic route that sends the user first to the AJAX Page
  app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes",(req, res)=>{
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
  
  // Displays all notes in JSON
  app.get("/api/notes", (req, res)=> {
    return res.json(notes);
  });
  
  // Displays a single note, or returns false
  app.get("/api/notes/:note", (req, res)=> {
    var chosen = req.params.note;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New note - takes in JSON input
  app.post("/api/notes", (req, res)=> {
   
    const newnote = req.body;
  
    console.log(newnote);
  
    // We then add the json the user sent to the note array
    notes.push(newnote);
  
    // We then display the JSON to the users
    res.json(newnote);
  });


  //DELETE route
  app.delete("/api/notes/:id", (req,res)=>{

  });
  
  // Starts the server to begin listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  