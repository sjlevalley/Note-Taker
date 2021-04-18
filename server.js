const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db.json');
const { nanoid } = require("nanoid");
const { json } = require('express');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));



// ######################## Function to Update Notes after Addition or Deletion ###########

function updateNotes() {
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log('The notes list has been updated!');
      });
    }



// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));


// ######################### API Get Request ##############################

app.get("/api/notes", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        JSON.stringify(data);
        res.send(data);
      })
});
    
// ######################### API Post Request ##############################

app.post("/api/notes", (req, res) => {
    db.push(req.body);
    updateNotes();
    res.send(db);
});

// ################## Delete's Note When Trashcan is Clicked ###############


app.delete("/api/notes/:id", function(req, res) {
    db.splice(req.params.id, 1);
    updateNotes();
    res.send("Note Deleted!")
});


// ################## Delete's Note When Trashcan is Clicked ###############


app.get("/api/notes/:id", function(req, res) {
    // db.splice(req.params.id, 1);
    res.json(req.params.id);
});






// Starts the server to begin listening
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
