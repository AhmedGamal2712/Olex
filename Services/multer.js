const multer = require('multer')
const { nanoid } = require('nanoid')
const path = require('path')
const fs = require('fs')
const fileExtensions = {
  ImageEX: ['image/jpg', 'image/jpeg', 'image/png'],
  fileEx: ['application/pdf', 'application/rar']
}

function my_multer (customPath, fileExtensions) {
  const fulldestPath = path.join(__dirname, `../uploads/${customPath}`)
  if (!customPath || customPath == null) {
    req.destinationFile = 'General_Folder'
  }
  if (!fs.existsSync(fulldestPath)) {
    fs.mkdirSync(fulldestPath, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.destinationFile = `uploads/${customPath}`
      cb(null, fulldestPath)
    },
    filename: function (req, file, cb) {
      const fullName = nanoid() + '==' + file.originalname
      cb(null, fullName)
    }
  })

  const fileFilter = function (req, file, cb) {
    if (fileExtensions.includes(file.mimetype)) {
      cb(null, true)
    } else {
      req.ExtensionError = true
      cb(null, false, req.ExtensionError)
    }
  }

  const upload = multer({
    dest: fulldestPath,
    fileFilter,
    storage
  })
  return upload
}

module.exports = { my_multer, fileExtensions }
