const Blog = require('../models/blog');

function blogsIndex(req, res) {
  Blog.find({}, (err, blogs) => {
    blogs.reverse();
    if (err) return console.log(err);
    return res.render('blogs', { blogs });
  });
}

function blogsCreate(req, res) {
  const blog = new Blog(req.body.blog);
  blog.save((err, blog) => {
    if (err) return console.log(err);
    return res.redirect('blogs');
  });
}

function blogsDelete(req, res) {
  Blog.findById((req.params.id), (err, blog) => {
    if (err) return console.log(err);
    blog.remove();
    return res.redirect('/blogs');
  });
}

module.exports = {
  index: blogsIndex,
  create: blogsCreate,
  delete: blogsDelete
};
