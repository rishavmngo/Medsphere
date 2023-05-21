const upload = {}
const db = require('../../db/db')
const AppError = require('../../utils/AppError')

upload.uploadOrgLogo = async (req, res, next) => {
  const id = req.id
  const filename = req.filename

  if (!filename) {
    return res.send(
      new AppError('Client Error', 404, 'File not uploaded', true)
    )
  }
  const response = {}

  const query = {
    text: 'UPDATE users set profile_picture = $2 where uid=$1 returning *',
    values: [id, filename],
  }

  try {
    const { rows } = await db.query(query)
    response.data = rows[0]
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

upload.uploadDoctorsProfilePicture = async (req, res, next) => {
  const id = req.params.doctorsId
  const filename = req.filename

  console.log(id, filename)

  if (!filename) {
    return res.send(
      new AppError('Client Error', 404, 'File not uploaded', true)
    )
  }
  const response = {}

  const query = {
    text: 'UPDATE users set profile_picture = $2 where uid=$1 returning *',
    values: [id, filename],
  }

  try {
    const { rows } = await db.query(query)
    response.data = rows[0]
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

upload.uploadDoctorSignature = async (req, res, next) => {
  const id = req.params.doctorsId
  const filename = req.filename

  if (!filename) {
    return res.send(
      new AppError('Client Error', 404, 'File not uploaded', true)
    )
  }
  const response = {}

  const query = {
    text: 'UPDATE users set signature = $2 where uid=$1 returning *',
    values: [id, filename],
  }

  try {
    const { rows } = await db.query(query)
    response.data = rows[0]
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
module.exports = upload
