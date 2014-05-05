
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Rooms
var rooms = {};
var registerRoom = function(name) {
    if (!rooms[name]) {
        console.log("Registering " + name);
        var votes = [];
        var room = {
            name: name,
            vote: function(vote) {
                votes.push(vote);
                io.sockets.emit('snapshot-' + name, votes);
            }
        };

        rooms[name] = room;
    }

    return rooms[name];
};

io.sockets.on('connection', function (socket) {
    socket.on('vote', function (vote) {
        var room = registerRoom(vote.room);
        room.vote(vote);
        console.log(vote);
    });
});

// Configuration

app.configure(function(){
    app.set('view engine', 'ejs');
    app.set('views',__dirname + '/views');
    app.set('view options', { layout:false, root: __dirname + '/views' });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.set('registerRoom', registerRoom);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/room-:room/', routes.display);
app.get('/room-:room/user-:user', routes.vote);

var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
