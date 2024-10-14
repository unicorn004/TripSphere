const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (request, response) => {
    try {
        const { name, email, password, city } = request.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({
                success: false,
                message: 'Email already exists. Please login with google',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            city
        });
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return response.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

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

module.exports = { setUserCity, loginUser }