const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appnubank', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
