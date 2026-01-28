const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        logo: {
            type: String,
        },
        category: {
            type: String,
        },
        discountCode: {
            type: String,
        },
        link: {
            type: String,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        eligibility: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
