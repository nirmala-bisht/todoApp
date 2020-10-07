var express = require("express");
var path=require('path');
var bodyParser=require("body-parser");
var app=express();
//var i1=[];
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    //res.send("heloo");
    res.render("list");
    //res.render('list',{newListItems:i1});
})
app.post("/",function(req,res){
    var i=req.body.n;
    //i1.push(i);
    console.log(i);
    //res.render("list",{newListItem:i});
    //res.redirect("/");
})

app.listen(5000,function(){
    console.log("Listening to port 5000");
})