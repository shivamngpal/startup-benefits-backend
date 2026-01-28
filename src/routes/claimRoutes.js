const express = require('express');
const router = express.Router();
const { createClaim, getMyClaims } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/claims - Create a claim (Protected)
router.post('/', protect, createClaim);

// GET /api/claims - Get my claims (Protected)
router.get('/', protect, getMyClaims);

module.exports = router;
