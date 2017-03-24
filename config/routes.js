const router = require('express').Router();

const blogs = require('../controllers/blogs');

router.route('/').get((req, res) => res.render('home'));

router.route('/blogs')
.get(blogs.index)
.post(blogs.create);
router.route('/blogs/:id')
.delete(blogs.delete);

module.exports = router;
