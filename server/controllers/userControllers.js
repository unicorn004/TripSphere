const { User } = require('../models/user');

const setUserCity = async (request, response) => {
    try {
        const { city, email } = request.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        user.city = city;
        user.save();
        return response.status(201).json({
            success: true,
            message: "City updated successfully",
            user
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

module.exports = { setUserCity }