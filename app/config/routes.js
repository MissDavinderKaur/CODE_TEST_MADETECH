const router = require('express').Router();

const blog = require('../controllers/blogs');

router.route('/').get((req, res) => res.render('home'));

router.route('/blogs')
  .get(blog.getAllBlogs)
  .post(blog.createBlog);

router.route('/blogs/:id')
  .delete(blog.deleteBlog);

module.exports = router;
