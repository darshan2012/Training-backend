var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const stateRouter = require("./routes/states");
const districtRouter = require("./routes/districts");
const companyRouter = require("./routes/compnies");
const analysisRouter = require("./routes/analysis");
const chatRouter = require("./routes/chatRouter");
const imageRouter = require("./routes/image");
const projectRouter = require("./routes/projects");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/profilePicture")));
app.use(express.static(path.join(__dirname, "public/profilePicture/b&w")));

const cors = require("cors");
app.use(cors());

app.use("/", indexRouter);
app.use("/users/v1", usersRouter);
app.use("/image/v1", imageRouter);
app.use("/states/v1", stateRouter);
app.use("/districts/v1", districtRouter);
app.use("/companies/v1", companyRouter);
app.use("/analysis/v1", analysisRouter);
app.use("/openai/v1", chatRouter);
app.use("/projects/v1", projectRouter);

// catch 404 and forward to error handler
app.use("*", function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.status = err.status || "error";
  // render the error page
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message,
  });
  // res.render('error');
});

module.exports = app;
