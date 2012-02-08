
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app)
  , routes = require('./routes')

app.listen(3000);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

io.configure( function(){
    io.set('log level', 0);
});

// Routes

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log('Client Connected');	
  socket.on('sensorData', function (data) {
    console.log(data);
  });
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
