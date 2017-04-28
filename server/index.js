var express = require('express');
var GitHub = require('github-api');
var bodyParser = require('body-parser');

var Repo = require('../database/index');
var mongoose = require('mongoose');
var db = mongoose.connection;

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/repos/import', function (req, res) {
  // TODO


  var gh = new GitHub({
    username: 'jeffc12',
    password: 'fee0e11dd69a9c420d59c599685084e42920a6bf'
  })
  gh = gh.getUser(req.body.username);

  gh.listRepos(function(err,data) {

  data.forEach(function(index) {

    // console.log('id',index.id);
    // console.log('name',index.name);
    // console.log('size',index.size);
    // console.log('watchers', index.watchers);

    var uniquename = index.full_name.toString();

    var newDoc = new Repo ({
      uniqueName: uniquename,
      id: index.owner.login,
      repoName: index.name,
      size: index.size,
      watchers: index.watchers

    })

    newDoc.save();
  })

})

})

app.get('/repos', function (req, res) {
  // TODO
  var memory = null;
  Repo.find({}, function(err,data) {

    if (err) {
      console.log('GET SERVER DID NOT WORK');
      throw err;
    }

    return res.json(data);

  })
  .limit(25)
  .sort({watchers: -1});


});

});



var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
