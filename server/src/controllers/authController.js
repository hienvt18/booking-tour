const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const authController = {
    // Register
    register: async (req, res) => {
        try {
            // Hashing password
            const salt = bcrypt.genSaltSync(10)
            const hashed = bcrypt.hashSync(req.body.password, salt)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                photo: req.body.photo
            })

            await newUser.save()
            res.status(200).json({success: true, message: "Successfully created"})
        } catch (error) {
            res.status(500).json({success: false, message: "Failed to create. Try again"})
        }
    },

    //Login
    login: async (req, res) => {
        const email = req.body.email
        try {
            const user = await User.findOne({email})

            // If user doesn't exist
            if(!user) {
                return res.status(404).json({ success: false, message: "User not found" })
            }

            // If user is exist then check the password or compare the password
            const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

            //If password is incorrect
            if (!checkCorrectPassword) {
                return res.status(401).json({success: false, message: "Incorrect email or password"})
            }

            const { password, role, ...orthers } = user._doc

            // create jwt token
            const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
            
            // set token in the browser cookie and send the response to the client
            res.cookie("accessToken", token, {
                httpOnly: true,
                expires: token.expiresIn
            }).status(200).json({token, role, data: {...orthers}})
        } catch (error) {
            res.status(500).json({success: false, message: "Failed to login"})
        }
    }
}

module.exports = authController