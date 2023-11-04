const express = require("express")
const router = express.Router()

const bookingController = require("../controllers/bookingController")
const { verifyUser, verifyAdmin } = require("../utils/verifyToken")

router.post("/", verifyUser, bookingController.createBooking)
router.post("/:id", verifyUser, bookingController.getSingleBooking)
router.get("/", verifyAdmin, bookingController.getAllBookings)

module.exports = router