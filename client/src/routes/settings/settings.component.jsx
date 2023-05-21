import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import ButtonPrime from '../../component/primary_btn/primary_btn.component'
import './settings.style.css'

const Settings = () => {
  const [image, setImage] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const { uploadProfilePicture } = useContext(AuthContext)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    setImage(file)
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', function (e) {
      setDisplayImage(e.currentTarget.result)
    })
    // uploadProfilePicture(file)
  }
  const uploadPhoto = () => {
    uploadProfilePicture(image)
  }
  return (
    <div>
      <input type='file' name='myfile' onChange={handleFileChange} />
      <div className='profile-picture-display'>
        <img src={displayImage} />
        {displayImage && <ButtonPrime onClick={uploadPhoto} text='upload' />}
      </div>
    </div>
  )
}

export default Settings
