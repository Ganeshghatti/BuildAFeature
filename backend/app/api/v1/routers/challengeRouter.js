const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const authMiddleware = require('../../../middlewares/authMiddleware');
const {
  listChallengesQueryValidation,
  createChallengeValidation,
  updateChallengeValidation,
} = require('../schemas/challengeSchemas');

// Public: list live challenges (for practice)
router.get('/live', challengeController.listLive);
// Protected: list all (including draft/archived) with filters - must be before /:id
router.get('/', listChallengesQueryValidation, challengeController.list);
// Public: get single challenge by id
router.get('/:id', challengeController.getById);

// Protected: create, update, delete (admin-only can be added later)
router.post('/', authMiddleware, createChallengeValidation, challengeController.create);
router.patch('/:id', authMiddleware, updateChallengeValidation, challengeController.update);
router.delete('/:id', authMiddleware, challengeController.delete);

module.exports = router;
