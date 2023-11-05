const express = require("express")
const videolikeController = require("../controllers/videolikeController")
const route = express.Router()

route.get("/", videolikeController.getAll.bind(videolikeController))

module.exports = route