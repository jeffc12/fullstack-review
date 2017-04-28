var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  uniqueName: {type: String, unique: true},
  id: String,
  repoName: String,
  size: String,
  watchers: Number


});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
