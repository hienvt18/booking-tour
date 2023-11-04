const User = require("../models/User")

const userController = {
    // Create new User
    createUser: async (req, res) => {
        const newUser = new User(req.body)
        try {
            const savedUser = await newUser.save()
            res.status(200).json({ success: true, message: "Successfully created", data: savedUser })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to create. Try again" })
        }
    },

    // Update User
    updateUser: async (req, res) => {
        const id = req.params.id
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true })
            res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to update. Try again" })
        }
    },

    // Delete User
    deleteUser: async (req, res) => {
        const id = req.params.id
        try {
            await User.findByIdAndDelete(id)
            res.status(200).json({ success: true, message: "Successfully deleted" })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to delete. Try again" })
        }
    },

    // Get single User
    getSingleUser: async (req, res) => {
        const id = req.params.id
        try {
            const User = await User.findById(id)
            res.status(200).json({ success: true, message: "Successfully Usered", data: User })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    },

    // Get all User
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}).limit(8)
            res.status(200).json({ success: true, message: " Successfull", data: users })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    }
}
module.exports = userController