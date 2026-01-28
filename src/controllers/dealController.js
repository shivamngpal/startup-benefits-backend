const Deal = require('../models/Deal');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
const getAllDeals = async (req, res) => {
    try {
        const { category } = req.query;

        // Build filter object
        const filter = {};
        if (category) {
            filter.category = category;
        }

        const deals = await Deal.find(filter);
        res.json(deals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get deal by ID
// @route   GET /api/deals/:id
// @access  Public
const getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.json(deal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllDeals, getDealById };
