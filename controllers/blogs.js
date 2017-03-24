const Blog = require('../models/blog');

function blogsIndex(req, res) {
  Blog.find({}, (err, blogs) => {
    if (err) return console.log(err);
    return res.render('blogs/index', { blogs });
  });
}

// function blogsNew(req, res) {
//   return res.render('blogs/new');
// }

function blogsCreate(req, res) {
  const blog = new Blog(req.body.blog);
  blog.save((err, blog) => {
    if (err) return console.log(err);
    return res.redirect('blogs/index');
  });
}

function blogsDelete(req, res) {
  Blog.findById((req.params.id), (err, blog) => {
    if (err) return console.log(err);
    blog.remove();
    return res.redirect('blogs/index');
  });
}



module.exports = {
  index: blogsIndex,
  // new: blogsNew,
  create: blogsCreate,
  delete: blogsDelete
};
