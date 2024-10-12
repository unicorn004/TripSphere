const { Messages } = require("../models/messages");

const addMessage = async (request, response) => {
    try {
        const { userId, question, answer } = request.body;
        const message = await Messages.create({ userId, question, answer });
        return response.status(200).json({
            success: true,
            message: "Message added successfully",
            addedMessage: message
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

const getMessages = async (request, response) => {
    try {
        const userId = request.headers.userid;
        const messages = await Messages.find({ userId }).sort({ createdAt: -1 });
        return response.status(200).json({
            success: true,
            messages,
            message: "Messages fetched successfully",
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

const deleteMessages = async (request, response) => {
    try {
        const { userId } = request.body;
        const messages = await Messages.deleteMany({ userId });
        return response.status(200).json({
            success: true,
            message: "Messages deleted successfully",
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

module.exports = { addMessage, getMessages, deleteMessages };