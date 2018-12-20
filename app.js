
 //import express.js
const express = require('express');
 //
const app = express();
 //create the server
const server = require("http").Server(app);
 //import socket.io
 const io     = require('socket.io')(server);
  //configurations
  //this is to especified that app now use the stuff inside public folder
 app.use(express.static("public"));

 // connect the server
const port = 3000;
server.listen(port, function(){
    console.log(`listening on http://localhost:${port}`);
});

 //routing
app.get("/",function(req, res){
    //senão tiver no views não lê
    res.render("chat.ejs");
 });

app.get("/search",function(req, res){
   res.send("GETTTTTTTTTTTT");
});
 //routing variables
app.get("/:search",function(req, res){
    const data = req.params.search;
    res.send("hello " + data);
 });
  //not found error
 app.get("*", function(req, res){
        res.send("404 not found")
 });
 //sockets
io.sockets.on('connection', function(socket){
    console.log("new user connected");
    socket.on("send message", function(data){
        console.log(data);
      
        io.sockets.emit("received message", {message:data.message});
        
    });
});