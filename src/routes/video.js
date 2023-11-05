const express = require("express")
const videoController = require("../controllers/videoController")
const route = express.Router()

route.get("/", videoController.getAll.bind(videoController))

module.exports = route