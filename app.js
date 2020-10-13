var express = require("express");
var path=require('path');
var http = require('http');
var bodyParser=require("body-parser");
const Mongoose  = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
var app=express();
app.set('port',process.env.PORT || 3000);
const uri = "mongodb+srv://todo_list:nimibisht@cluster0.uqpjt.mongodb.net/test?retryWrites=true&w=majority";
Mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//var i1=[];



const todoSchema=new Mongoose.Schema({
    titel:String,
    complete:{
        type:Boolean,
        default:false
    }
});
const Todo=Mongoose.model('todo',todoSchema)

app.get("/",function(req,res){
    //res.send("heloo");
    Todo.find().then(todo=>res.json(todo))
   
    
});

/*app.post("/",function(req,res){
     i = req.body.n;
    i1.push(i);
    //console.log(i);
   
 res.redirect("/");
    
});*/

http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listening on port'+app.get('port'));
	
});

module.exports=Todo;