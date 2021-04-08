// import express, router handler, path, and fs
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require('../db/db.json');


// route paths
// loads index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ".././public/index.html"));
});
// Changes and loads to notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, ".././public/notes.html"));
});
// Gets notes from db
router.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf-8', (err, data) => {
        if (err) console.log(err);
        else {
            res.send(data);
        }
    });
});
// Adds note into db
router.post("/api/notes", (req, res) => {
    const data = req.body;
    data.id = data.title + db.length;
    db.push(data);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        err ? console.log(err) : console.log("Successfully added to db.json");
    })
    res.send("Successfully written to db");
})
// Deletes note from db
router.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            db.splice(i, 1);
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        err ? console.log(err) : console.log(`Successfully deleted ${id} from db.json`);
    });
    res.send("Successfully written to db");
});
// All other routes that do not exist load index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ".././public/index.html"));
});

module.exports = router;