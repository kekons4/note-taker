// Imports
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = require('./routes/routes');

// intialize express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
// Accept and use JSON
app.use(express.json());
// allows the html pages to use js and css
app.use(express.static(__dirname + '/public'));

// route all requests to router.js
app.use(router);

// start listening for requests on PORT 3000
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});