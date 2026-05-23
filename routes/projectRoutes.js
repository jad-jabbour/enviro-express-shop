const express = require('express');
const router = express.Router();
const project = require('../controllers/projectController');
router.get('/', project.getAllProjects);
module.exports = router;
