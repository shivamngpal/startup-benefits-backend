const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        deal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deal',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'approved',
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure a user can only claim a specific deal once
claimSchema.index({ user: 1, deal: 1 }, { unique: true });

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;
