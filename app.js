var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
var request = require('request');


app.get("/dummy", (req, res) => {
  //res.send('homepage from prerna kamra')
  res.render("dummy.ejs");
});
app.get("/", (req, res) => {
  //res.send('homepage from prerna kamra')
  res.render("home.ejs");
});

app.get("/result", (req, res) => {
  console.log(req.query);
  //res.send(`Your are search for ${req.query.moviename}`)
  const url = `http://www.omdbapi.com/?apikey=7b1b0854&s=${req.query.movieName}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      
      const data = JSON.parse(body);
      // res.send(data)
      res.render("result.ejs", { moviesDump: data });
    } else {
      res.send("something  went wrong");
    }
  });
});
app.get("/result/:id", (req, res) => {
  const url = `http://www.omdbapi.com/?apikey=7b1b0854&i=${req.params.id}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      // console.log(response.statusCode);
      // console.log(data);
      res.setHeader("Content-Type","text/html");
      res.render("details.ejs", { data: data });
      // res.send(data);
    } else {
      res.send("something  went wrong");
    }
  });
});
app.get("/contact", (req, res) => {
  console.log(req.query);
  //res.send(`Your are search for ${req.query.moviename}`)
  const url = `http://www.omdbapi.com/?apikey=7b1b0854&s=${req.query.Type}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      console.log(data);
      res.setHeader("Content-Type","text/html");
      res.render("Type.ejs", { moviesDump: data });
      // res.send(data)
    } else {
      res.send("something  went wrong");
    }
  });
});
app.get("*", (req, res) => {
  res.render("dummy.ejs");
});

module.exports = app;
