const express = require('express');
const router = express.Router();
const service = require('../controllers/serviceController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
router.route('/').get(service.getAllServices).post(verifyJWT, verifyRoles(5150), service.createService);
router.route('/:id').get(service.getService);
module.exports = router;
