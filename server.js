const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const db = require('./db.json');
const { nanoid } = require("nanoid");


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




app.get("/api/notes", (req, res) => {

    const currentNotes = fs.readFileSync("./db.json", "utf-8")
    .then((data) => JSON.parse(data)); 
    console.log(data);
    res.json(currentNotes);
});
 
    





// app.post("/api/notes", (req, res) => 
    
//     fs.readFile((path.join(__dirname, "/db.js", 'utf-8', function(err, data){
//         res.json(req.body)
//     })
    
//     ));




// const readNotes = () =>
//     fs.readFile(path.join(__dirname, "/db.js"), "utf-8")
//         .then((data) => console.log(data));

// const makeNote = (title, noteText) => {
//     if (!title || noteText) {
//         return Promise.reject(new Error("Cannot have an empty title or text"));
//     } 
    
    
//     fs.readFile(path.join(__dirname, "/db.js"), "utf-8")
//         .then((data) => JSON.parse(data))
    
//     .then((noteArray) => {
//         const note = {
//             // id: nanoid(),
//             title,
//             noteText,
//         };
//         noteArray.push(note);
//         return fs.writeFile(path.join(__dirname, "/db.js"), JSON.stringify(movies), "utf-8")
//             .then(() => note);
//     });
// };


// app.post("api/notes", (req, res) => {
//     res(req.body);
//     // const { title, noteText } = req.body;
//     // makeNote(title, noteText)
//     // .then(() => res("hello"))
//     // .catch((err) => {
//     //     console.log(err);
//     //     res.sendStatus(400);
//     // });
// });


// app.post("/api/notes", (req, res) => {
//     newNoteInfo = req.body;
//     let filePath = path.join(__dirname, "/db.js");
//     noteArray.push(newNoteInfo);

//     fs.writeFile(filePath, JSON.stringify(noteArray), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("Note saved successfully!");
//     })

//     res.json(noteArray);
// });






// Starts the server to begin listening
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
