const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

// @desc    Create a claim
// @route   POST /api/claims
// @access  Private
const createClaim = async (req, res) => {
    try {
        const { dealId } = req.body;
        const userId = req.user._id;

        // Check if deal exists
        const deal = await Deal.findById(dealId);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        // Check if user has already claimed this deal
        const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
        if (existingClaim) {
            return res.status(400).json({ message: 'You have already claimed this deal' });
        }

        // Check if deal is locked and user is not verified
        if (deal.isLocked && !req.user.isVerified) {
            return res.status(403).json({
                message: 'This deal is locked. Please verify your account to access it.'
            });
        }

        // Create the claim
        const claim = await Claim.create({
            user: userId,
            deal: dealId,
        });

        // Populate deal details for response
        await claim.populate('deal', 'title logo discountCode');

        res.status(201).json({
            message: 'Deal claimed successfully',
            claim,
        });
    } catch (error) {
        console.error(error);
        // Handle duplicate key error from compound index
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already claimed this deal' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get my claims
// @route   GET /api/claims
// @access  Private
const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ user: req.user._id })
            .populate('deal', 'title logo discountCode link category')
            .sort({ createdAt: -1 });

        res.json(claims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createClaim, getMyClaims };
