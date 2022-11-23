var express = require("express");
var bodyparser = require("body-parser");
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var routes = require("./routes.js")(app);

var server = app.listen(3000, function() {
    console.log("listening on port %s", server.address().port);
})