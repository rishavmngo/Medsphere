const express = require('express')
const route = express.Router()
const multer = require('multer')
const upload = require('./upload.controller')
const path = require('path')
const { verify } = require('../../middlewares/jwt')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
    req.filename = filename
  },
})

const uploadMw = multer({ storage: storage })

route.post(
  '/org/profile/icon',
  verify,
  uploadMw.single('image'),
  upload.uploadOrgLogo
)

route.post(
  '/doctor/profile/profile_picture/:doctorsId',
  verify,
  uploadMw.single('image'),
  upload.uploadDoctorsProfilePicture
)
route.post(
  '/doctor/profile/signature/:doctorsId',
  verify,
  uploadMw.single('image'),
  upload.uploadDoctorSignature
)

module.exports = route
