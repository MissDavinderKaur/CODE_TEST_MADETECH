const Blog = require('../models/blog');

function blogsIndex(req, res){
  Blog.find({}, (err, blogs) => {
    if (err) return res.status(500).json(err);
    blogs.sort();
    return res.status(200).json(blogs);
  });
}

function blogsCreate(req, res) {
  const blog = new Blog(req.body.blog);
  blog.save((err, blog) => {
    if (err) return console.log(err);
    return res.send( { blog } );
  });
}

function blogsDelete(req, res) {
  Blog.findByIdAndRemove((req.params.id), (err, blog) => {
    if (err) return console.log(err);
    return res.sendStatus(200);
  });
}

module.exports = {
  index: blogsIndex,
  create: blogsCreate,
  delete: blogsDelete
};
