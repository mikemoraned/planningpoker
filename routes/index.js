
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.display = function(req, res){
    var room = req.params["room"];
    console.log(room);
    res.render('display', { title: 'Display' });
};

exports.vote = function(req, res){
    var room = req.params["room"];
    var user = req.params["user"];
    console.log(room);
    console.log(user);
    res.render('vote', { title: 'Vote' });
};