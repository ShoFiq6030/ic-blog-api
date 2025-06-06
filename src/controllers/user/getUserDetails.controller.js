const User = require('../../models/user.model');



const getUserDetailsController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id).select('-password -verificationCode -__v -isVerified -verificationCode -resetToken -resetTokenExpiry');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getUserDetailsController;