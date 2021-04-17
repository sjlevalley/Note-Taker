const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require("./index.js")

// const fs = require('fs').promises;

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public'), { extensions: [".html"] } ));




// Routes

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// app.get("/public/js/index.js", (req, res) => res.sendFile(path.join(__dirname, "../public/js/index.js")))

// app.post('/reserve', (req, res) => {
    
//     const newNote = req.body;

// });





// Displays all notes

app.get("/api/notes", (req, res) => 
 db.readNotes().then(notes => res.json(notes))
);



// Starts the server to begin listening
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
