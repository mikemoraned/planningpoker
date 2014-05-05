
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.display = function(req, res){
    var room = res.app.settings.registerRoom(req.params["room"]);
    console.log(room);
    res.render('display', {
        title: 'Display',
        room: room
    });
};

exports.vote = function(req, res){
    var room = res.app.settings.registerRoom(req.params["room"]);
    var user = req.params["user"];
    console.log(room);
    console.log(user);
    res.render('vote', {
        title: 'Vote',
        room: room,
        user: user
    });
};