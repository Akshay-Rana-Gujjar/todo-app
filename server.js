var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
const PORT = "3000"


mongoose.connect("mongodb://localhost:27017/to-do");

app.use(express.static(__dirname+"/public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({'type':'application/vnd.api+json'}));
app.use(methodOverride());

// create model for db
var Todo = mongoose.model("Todo",{
  text: String
})

//_____________________ ROUTES _________________________

// get all todos list
app.get("/api/v1/todos", function(req , res){
  Todo.find(function(err, todos){
    if(err){
      res.send(err);
    }

    res.json(todos); // return all todos in json format

  });
});

// create new todo
app.post("/api/v1/todos", function(req, res){
  Todo.create({
    text:req.body.text,
    done : false
  },function(err, todo){
    if(err)
      res.send(err)

    res.json(todo);

  });
});

app.delete("/api/v1/todos/:todo_id", function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  },function(err, todo){
    if(err)
      res.send(err)

    res.json(todo);
  });
});

//----------------- Application -------------------
app.get("/", function(req, res){
  res.sendFile("./public/index.html");
})


app.listen(PORT);
console.log("server listen @ ",PORT);