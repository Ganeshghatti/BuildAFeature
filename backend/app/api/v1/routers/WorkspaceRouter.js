const express = require('express');
const WorkspaceController = require('../controllers/WorkspaceController');
const router = express.Router();


router.post('/get_structure' , WorkspaceController.read);

module.exports = router ;