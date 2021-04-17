const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');
// const noteArray = require('noteArray');

console.log(db);



// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

  


// console.log(noteList);

// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get("/api/notes", (req, res) => res.json(db));


app.post("/api/notes", (req, res) => {
    const {title, text} = req.body;
});






// Starts the server to begin listening
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
