const Blog = require('../models/blog');

function blogsIndex(req, res) {
    console.log('in index function');
  Blog.find({}, (err, blogs) => {
    if (err) return console.log(err);
    return res.render('blogs', { blogs });
  });
}

function blogsCreate(req, res) {
  console.log('in create function');
  const blog = new Blog(req.body.blog);
  blog.save((err, blog) => {
    if (err) return console.log(err);
      console.log('about to go to index');
    return res.redirect('blogs');
  });
}

function blogsDelete(req, res) {
  Blog.findById((req.params.id), (err, blog) => {
    if (err) return console.log(err);
    blog.remove();
    return res.redirect('blogs');
  });
}

module.exports = {
  index: blogsIndex,
  create: blogsCreate,
  delete: blogsDelete
};
