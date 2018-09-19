const express = require('express')
const multer = require('multer')

const Router = express.Router()

const fileUpload = require('./fileUpload').SingleFileUpload

Router.post('/', fileUpload.single("file"), (req, res) => {
    let actualfile = req.file
    return res
            .status(200)
            .json({ message: actualfile.originalname + " Uploaded"})
            .send()
})

module.exports = Router
