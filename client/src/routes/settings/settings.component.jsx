import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import ButtonPrime from '../../component/primary_btn/primary_btn.component'
import './settings.style.css'
import UpdateOrg from '../../component/updateOrg/updateOrg.component'
import Configration from '../../component/configration/configration.component'

const Settings = () => {
  const [displayImage, setDisplayImage] = useState(null)
  const { uploadProfilePicture, user, updateOrganisation } =
    useContext(AuthContext)
  const [image, setImage] = useState(null)
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
    <div className='setting-container'>
      <div className='setting-org-icon-container-'>
        <h1 className='organsiation-setting-title'>Organisation Settings</h1>
        <div className='profile-picture-display'>
          <img src={displayImage} />
        </div>
        {displayImage ? (
          <label className='org_icon_chooser' onClick={uploadPhoto}>
            Upload
          </label>
        ) : (
          <>
            <input
              type='file'
              id='myfile'
              name='myfile'
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor='myfile' className='org_icon_chooser'>
              choose icon
            </label>
          </>
        )}
      </div>
      <UpdateOrg user={user} updateOrganisation={updateOrganisation} />
      <Configration user={user} />
    </div>
  )
}

export default Settings
