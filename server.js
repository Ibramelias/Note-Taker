// Dependencies 
const express = require ("express");
const path = require ("path");

// Sets up the Express App
const app = express()
const PORT = 3000;

// Set up the Express ass to handel data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Notes (DATA)
var notes = [
    {
      routeName: "day1",
      name: "Day1",
      role: "Jedi Master",
    },
    {
      routeName: "day2",
      name: "Day2",
      role: "Sith Lord",
    },
    {
      routeName: "day3",
      name: "Day3",
      role: "Jedi Master",
    }
  ];

  // Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.send("welcome");
  });

  
  // Displays all characters
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  
  // Displays a single character, or returns false
  app.get("/api/notes/:note", function(req, res) {
    var chosen = req.params.note;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Characters - takes in JSON input
  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newcharacter = req.body;
  
    console.log(newcharacter);
  
    // We then add the json the user sent to the character array
    characters.push(newnote);
  
    // We then display the JSON to the users
    res.json(newnote);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  