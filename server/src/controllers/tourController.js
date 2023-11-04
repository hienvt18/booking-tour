const Tour = require("../models/Tour")

const tourController = {
    // Create new tour
    createTour: async (req, res) => {
        const newTour = new Tour(req.body)
        try {
            const savedTour = await newTour.save()
            res.status(200).json({ success: true, message: "Successfully created", data: savedTour })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to create. Try again" })
        }
    },

    // Update tour
    updateTour: async (req, res) => {
        const id = req.params.id
        try {
            const updatedTour = await Tour.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true })
            res.status(200).json({ success: true, message: "Successfully updated", data: updatedTour })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to update. Try again" })
        }
    },

    // Delete tour
    deleteTour: async (req, res) => {
        const id = req.params.id
        try {
            await Tour.findByIdAndDelete(id)
            res.status(200).json({ success: true, message: "Successfully deleted" })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to delete. Try again" })
        }
    },

    // Get single tour
    getSingleTour: async (req, res) => {
        const id = req.params.id
        try {
            const tour = await Tour.findById(id).populate("reviews")
            res.status(200).json({ success: true, message: "Successfully toured", data: tour })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    },

    // Get all tour
    getAllTours: async (req, res) => {
        // for pagination
        const page = parseInt(req.query.page)
        try {
            const tours = await Tour.find({}).populate("reviews").skip(page * 8).limit(8)
            res.status(200).json({ success: true, count: tours.length,message: " Successfull", data: tours })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    },

    // Get Tour by Search
    getTourBySearch: async (req, res) => {
        // here 'i' means case sensitive
        const city = new RegExp(req.query.city, "i") 
        const distance = parseInt(req.query.distance)
        const maxGroupSize = parseInt(req.query.maxGroupSize)

        try {
            // gte means greater than equal
            const tours = await Tour.find({ city, distance:{$gte: distance}, maxGroupSize:{$gte: maxGroupSize} }).populate("reviews")
            res.status(200).json({ success: true, message: "Successfull", data: tours })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    },

    // Get featured tour
    getFeaturedTour: async (req, res) => {
        try {
            const tours = await Tour.find({featured: true}).limit(8)
            res.status(200).json({ success: true, count: tours.length,  message: " Successfull", data: tours })
        } catch (error) {
            res.status(404).json({ success: false, message: "Not found" })
        }
    },

    // Get tour counts
    getTourCounts: async (req, res) => {
        try {
            const tourCount = await Tour.estimatedDocumentCount()
            res.status(200).json({ success: true, data: tourCount })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to fetch" })
        }
    }
}

module.exports = tourController