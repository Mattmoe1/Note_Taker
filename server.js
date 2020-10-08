const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// PORT
const PORT = process.env.PORT || 8080;

// Data Parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// JSON Data
app.post("/api/notes", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    let notesNew = req.body;
        notes.push(notesNew);
    
    for (var i = 0;i<notes.length;i++){
        notes[i].id = i + 1;
        }
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    })
    
// Delete The Note
app.delete("/api/notes/:id", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    let noteID = req.params.id;
        notes = notes.filter(thisNote => {
        return thisNote.id != noteID;
    })
    
    for (var i = 0;i<notes.length;i++){
        notes[i].id = i + 1;
    }
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    
    console.log("You've deleted a Note!");
    })

// The Server
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));