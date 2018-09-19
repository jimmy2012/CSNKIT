const multer = require("multer")
const path = require('path')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //defines the destination folder-where the file will get saved.
    cb(null, '/Users/user/Documents/react/MyApps/exercise/csnkit/static/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
})

exports.SingleFileUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
})
