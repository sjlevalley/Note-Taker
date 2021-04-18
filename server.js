const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db.json');
const { nanoid } = require("nanoid");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));



// ######################## Function to Update Notes after Addition or Deletion ###########
// ######################## Function to Update Notes after Addition or Deletion ###########
// ######################## Function to Update Notes after Addition or Deletion ###########

function updateNotes() {
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log('The notes list has been updated!');
      });
    }

    
// ############################################### Routes #################################
// ############################################### Routes #################################
// ############################################### Routes #################################

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


// ###################################### API Get Request #################################
// ###################################### API Get Request #################################
// ###################################### API Get Request #################################

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
    
// ###################################### API Post Request ################################
// ###################################### API Post Request ################################
// ###################################### API Post Request ################################

app.post("/api/notes", (req, res) => {
    let note = req.body;
    note.id = nanoid();
    db.push(note);
    updateNotes();
    res.send(db);
});

// ###################################### Delete Note #####################################
// ###################################### Delete Note #####################################
// ###################################### Delete Note #####################################

app.delete("/api/notes/:id", function(req, res) {
    let noteID = req.params.id;
    for (i=0; i<db.length; i++){
      if (db[i].id === noteID){
        db.splice(i, 1);
        updateNotes();
        res.send(db);
      }
    }
});


// ############################ Display Note When Clicked #################################

app.get("/api/notes/:id", function(req, res) {
    res.json(req.params.id);
});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
