const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Messages = mongoose.model('messages', messageSchema);

module.exports = { Messages };