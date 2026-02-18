const express = require('express')
const router = express.Router();
const FolderStructureController = require("../controllers/folderstructureController");


router.post('/get_structure' , FolderStructureController.read);

module.exports = router ;