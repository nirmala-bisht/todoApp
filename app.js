var express = require("express");
var path=require('path');
var http = require('http');
var bodyParser=require("body-parser");
const Mongoose  = require("mongoose");
var app=express();
app.set('port',process.env.PORT || 4000);
const uri = "mongodb+srv://test:nimibisht@cluster0.uqpjt.mongodb.net/todo_list?retryWrites=true&w=majority";
Mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once('open',() => {
    //console.log("MongoDB database connection established successfully");
});

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//var i1=[];
const itemSchema=new Mongoose.Schema({
    name: String,
    
});
const Item=Mongoose.model('item',itemSchema)
/*const list1= new Item({
    name:"welcome to todo list1",
});
const list2= new Item({
    name:"welcome to todo list2",
});
const list3= new Item({
    name:"welcome to todo list3",
});
const d=[list1,list2,list3];*/
/*Item.insertMany(d,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("successfully saved the todo list");
    }
})*/

app.get("/",function(req,res){
    /*res.send("heloo");
    res.render('list',{newListItems:i1});*/
    Item.find({},function(err,f){
    
       //res.render('list',{newListItems:f})
       if(f.length===0){
        Item.insertMany(d,function(err){
            if(err){
                console.log(err);
            }else{
                console.log("successfully saved the todo list");
            }
        });
       res.redirect("/");
    }else{
        res.render("list",{newListItems:f});
    }
}); 
})

app.post("/",function(req,res){
    const itemName=req.body.n;
    const item=new Item({
        name:itemName
    });
    /*var i=req.body.n;
    i1.push(i);
   console.log(i);
    res.render("list",{newListItem:i});*/
    item.save();
    
});

app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
  console.log(req.body.checkbox);
});
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listening on port'+app.get('port'));
	
});

module.exports=Item;