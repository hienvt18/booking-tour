const Booking = require("../models/Booking")

const bookingController = {
    createBooking: async (req, res) => {
        const newBooking = new Booking(req.body)
        try {
            const savedBooking = await newBooking.save()
            res.status(200).json({success: true, message: "Your tour is booked", data: savedBooking})
        } catch (error) {
            res.status(500).json({success: false, message: "ỉnteral server error"})
        }
    },

    
    getSingleBooking: async (req, res) => {
        const id = req.params.id
        try {
            const book = await Booking.findById(id)
            res.status(200).json({success: true, message: "Successfull", data: book})
        } catch (error) {
            res.status(404).json({success: false, message: "Not Found"})
        }
    },

    getAllBookings: async (req, res) => {
        try {
            const books = await Booking.find()
            res.status(200).json({success: true, message: "Successfull", data: books})
        } catch (error) {
            res.status(500).json({success: false, message: "ỉnteral server error"})
        }
    }

}
module.exports = bookingController