const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const { verifyUser, verifyAdmin } = require("../utils/verifyToken")

// create new User
router.post("/", verifyUser, userController.createUser)

// update User
router.put("/:id", verifyUser, userController.updateUser)

// delete new User
router.delete("/:id", verifyUser, userController.deleteUser)

// get single User
router.get("/:id", verifyUser, userController.getSingleUser)

// get all Users
router.get("/", verifyAdmin, userController.getAllUsers)

module.exports = router