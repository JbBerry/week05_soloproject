var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

var studentRouter = require("./routes/students");
var assignmentRouter = require("./routes/assessments");
var markRouter = require("./routes/marks");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/students", studentRouter);
app.use("/assessments", assignmentRouter);
app.use("/marks", markRouter);

module.exports = app;
