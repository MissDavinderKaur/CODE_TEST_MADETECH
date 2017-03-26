const mongoose = require('mongoose');
const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost/bloggingservice';
mongoose.connect(databaseURL);

const Blog = require('../models/blog');

Blog.collection.drop();

const blog1 = new Blog({
  fullName: 'Davinder Kaur',
  screenName: 'MissDK',
  blogText: 'Something Interesting here'
});
blog1.save((err, blog) => {
  if (err) return console.log(err);
  console.log(`${blog1.fullName} was saved`);
});

const blog2 = new Blog({
  fullName: 'Davinder Kaur2',
  screenName: 'MissDK2',
  blogText: 'Something Interesting here2'
});
blog2.save((err, blog) => {
  if (err) return console.log(err);
  console.log(`${blog2.fullName} was saved`);
});

const blog3 = new Blog({
  fullName: 'Davinder Kaur3',
  screenName: 'MissDK3',
  blogText: 'Something Interesting here3'
});
blog3.save((err, blog) => {
  if (err) return console.log(err);
  console.log(`${blog3.fullName} was saved`);
});

const blog4 = new Blog({
  fullName: 'Davinder Kaur4',
  screenName: 'MissDK4',
  blogText: 'Something Interesting here4'
});
blog4.save((err, blog) => {
  if (err) return console.log(err);
  console.log(`${blog4.fullName} was saved`);
});

const blog5 = new Blog({
  fullName: 'Davinder Kaur5',
  screenName: 'MissDK5',
  blogText: 'Something Interesting here5'
});
blog5.save((err, blog) => {
  if (err) return console.log(err);
  console.log(`${blog5.fullName} was saved`);
});
