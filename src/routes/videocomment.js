const express = require("express")
const videocommentController = require("../controllers/videocommentController")
const route = express.Router()

route.get("/", videocommentController.getAll.bind(videocommentController))

module.exports = route