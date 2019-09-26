
var express = require('express');
var app = express();
var aws_function = require(__dirname+'/funtionFormAWS.js'); 
var form_function = require(__dirname+'/funtionFormInterface.js'); 


app.get('/', function (req, res) {
    form_function.displaySearchForm(res);
    aws_function.getAllItems(res);
})

app.get('/search', function (req, res) {
    var NewTitle = req.query.NewTitle;
    if (!NewTitle) {
        res.writeHead(302, { 'Location': '/' });
        res.end();
    }
    else {
        
        form_function.displaySearchForm(res);
        aws_function.searchItems(NewTitle, res);
    }
})
app.get('/new', function (req, res) {
    form_function.addNewForm(res);
    res.end();
})
app.get('/create', function (req, res) {
    var id = req.query.Id;
    var newtitle = req.query.NewTitle;
    var pub = req.query.PublishDate;
    var img = req.query.Image;
    var cont = req.query.Content;
    var aut = req.query.Author;
    aws_function.createItem(id, newtitle, pub, img, cont,aut, res);
})
app.get('/edit', function (req, res) {
    var id = req.query.Id;
    var newtitle = req.query.NewTitle;
    var pub = req.query.PublishDate;
    var img = req.query.Image;
    var cont = req.query.Content;
    var aut = req.query.Author;
    form_function.editForm(id, newtitle, pub, img, cont,aut, res);
    res.end();
})
app.get('/save', function (req, res) {
    var id = req.query.Id;
    var newtitle = req.query.NewTitle;
    var pub = req.query.PublishDate;
    var img = req.query.Image;
    var cont = req.query.Content;
    var aut = req.query.Author
    aws_function.updateItem(id, newtitle, pub, img, cont,aut, res);
})
app.get('/delete', function (req, res) {
    var id = req.query.Id;
    var newtitle = req.query.NewTitle;
    aws_function.deleteItem(id, newtitle, res);
})

var server = app.listen(9999, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is running at", host, port);
})