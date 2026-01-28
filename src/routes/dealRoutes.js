const express = require('express');
const router = express.Router();
const { getAllDeals, getDealById } = require('../controllers/dealController');

// GET /api/deals - Get all deals (Public)
router.get('/', getAllDeals);

// GET /api/deals/:id - Get deal by ID (Public)
router.get('/:id', getDealById);

module.exports = router;
