var port=3000;
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var UserSchema = new mongoose.Schema({
  account: { type: String, unique: true },
  password: String,
  name: String,
  description: String,
  updated_at: { type: Date, default: Date.now },
});
var User = mongoose.model('User', UserSchema);

app.use(express.static(__dirname + '/assets/'));
app.use(bodyparser());
app.get('/', function(req, resp){
    resp.sendfile(__dirname+'/assets/index.html');
});
app.get('/user', function(req, resp){
    User.find({},function(err, rs){
        if (err) console.error(err);
        resp.send(rs);
    });
});
app.get('/user/:_id', function(req, resp){
    User.find({_id: req.params._id},function(err, rs){
        if (err) console.error(err);
        resp.send(rs[0]);
    });
});
app.post('/user/login', function(req, resp){
    User.find(req.body,function(err, rs){
        if (err) console.error(err);
        resp.send(rs[0]);
    });
});
app.post('/user', function(req, resp){
    var user=new User(req.body);
    user.save(function(err){
        if (err) console.error(err);
        resp.send(user);
    });
});
app.put('/user/:_id', function(req, resp){
    User.findByIdAndUpdate(req.params._id, req.body,function(err, rs){
        if (err) console.error(err);
        resp.send(rs);
    });
});
app.delete('/user/:_id', function(req, resp){
    User.findByIdAndRemove(req.params._id, function(err, rs){
        if (err) console.error(err);
        resp.send(rs);
    });
});
app.listen(port);

console.log("express server is running on: "+port);
