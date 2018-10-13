var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCounter = 0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});


io.on('connection', function(socket){
  var room1;
  userCounter++;
  console.log('user connected');
  socket.on('room',function(room){
     room1 = room;
    socket.join(room);

  });
  socket.on('message', function(msg){
    //TODO encrypt the data using the parameter msg in this function
    io.to(room1).emit('message',msg);

  });
  socket.on('disconnect', function(){
    userCounter--;
    console.log('a user disconnected');
  });
});
http.listen(80, function(){
  console.log('listing on port 80');
});
