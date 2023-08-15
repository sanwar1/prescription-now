const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("../routes/routes");

function createServer() {
    const app = express();
    // Set up static files, bodyParser, routes middleware
    app.use(express.static("views"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use("/", routes);
    return app;
}

module.exports = createServer;
