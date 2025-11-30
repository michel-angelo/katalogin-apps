const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const authUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
            })
        } else {
            res.status(400).json({message: 'Email dan atau Password salah'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error saat Login" });
    }
}

module.exports = { authUser };