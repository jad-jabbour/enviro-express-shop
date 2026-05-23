const express = require('express');
const router = express.Router();
const pages = require('../controllers/pageController');
router.get('/', pages.home);
router.get('/about', pages.about);
router.get('/contact', pages.contact);
module.exports = router;
