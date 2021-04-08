// Imports
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require('./db/db.json');


// intialize express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

// route paths
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf-8', (err, data) => {
        if (err) console.log(err);
        else {
            res.send(data);
        }
    });
});

app.post("/api/notes", (req, res) => {
    const data = req.body;
    data.id = data.title + db.length;
    db.push(data);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        err ? console.log(err) : console.log("Successfully added to db.json");
    })
    res.send("Successfully written to db");
})

app.delete("/api/notes/:id", (req, res) => {
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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// start listening for requests
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});