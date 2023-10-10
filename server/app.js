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

    // handle 404 errors
    app.use(function (req, res, next) {
        const data = {
            msg1: `Page Not Found!`,
            msg2: `The page you are looking for does not exist. Navigate to the home page instead!`,
        };
        res.render("error", { data });
    });

    // handle all other errors
    app.use(function (err, req, res, next) {
        // res.status(err.status || 500).json({ err: err.message });
        const data = {
            msg1: err.message,
            msg2: err.body,
        };
        res.render("error", { data });
    });
    return app;
}

module.exports = createServer;
