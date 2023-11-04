const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")
const { verifyUser } = require("../utils/verifyToken")

router.post("/:tourId", verifyUser, reviewController.createReview)

module.exports = router