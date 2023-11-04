const express = require("express")
const router = express.Router()
const tourController = require("../controllers/tourController")
const { verifyAdmin } = require("../utils/verifyToken")

// create new tour
router.post("/", verifyAdmin, tourController.createTour)

// update tour
router.put("/:id", verifyAdmin, tourController.updateTour)

// delete new tour
router.delete("/:id", verifyAdmin, tourController.deleteTour)

// get single tour
router.get("/:id", tourController.getSingleTour)

// get all tours
router.get("/", tourController.getAllTours)

//get tour by search
router.get("/search/getTourBySearch", tourController.getTourBySearch)

//get featured tour
router.get("/search/getFeaturedTours", tourController.getFeaturedTour)

//get tour counts
router.get("/search/getTourCount", tourController.getTourCounts)


module.exports = router

