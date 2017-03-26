const Blog = require('../models/blog');

function blogsIndex(req, res) {
  Blog.find({}, (err, blogs) => {
    if (err) return res.status(500).json(err);
    blogs.sort();
    return res.status(200).json(blogs);
  });
}

function blogsCreate(req, res) {
  if (req.body.blog.blogText.length >= 150 || req.body.blog.blogText.length === 0) {
    return res.status(400)
      .send({ err: 'Blog entries must be between 1 and 150 characters' });
  }

  const newBlog = new Blog(req.body.blog);
  return newBlog.save((err, blog) => {
    if (err) return res.status(400).json(err);
    return res.status(200).send({ blog });
  });
}

function blogsDelete(req, res) {
  Blog.findByIdAndRemove((req.params.id), (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
}

module.exports = {
  getAllBlogs: blogsIndex,
  createBlog: blogsCreate,
  deleteBlog: blogsDelete,
};
