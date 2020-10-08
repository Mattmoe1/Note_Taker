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


// The Server
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));