var router = require('express').Router();

router.use('/', require('./homeController'));
router.use('/post', require('./postController'));
router.use('/category/populaires', require('./postController'));
router.use('/login',require('./loginController'));

module.exports = router;

