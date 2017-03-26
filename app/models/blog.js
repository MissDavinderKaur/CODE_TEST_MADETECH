const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  fullName: {type: String},
  screenName: {type: String},
  blogText: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
