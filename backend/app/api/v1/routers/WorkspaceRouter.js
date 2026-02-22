const express = require('express');
const workspaceController = require('../controllers/workspaceController');
const router = express.Router();


router.post('/get_structure' , workspaceController.read);

module.exports = router ;