import { useState } from 'react'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import './patients.style.css'
const Patients = () => {
  const [somethingSlidebar, setSomethingSlidebar] = useState(false)

  function handleSlideBar() {
    somethingSlidebar(true)
  }
  return (
    <div>
      Patients
      <button onClick={handleSlideBar}>toggle</button>
      {somethingSlidebar && (
        <LeftSlideBar>
          <div>something</div>
        </LeftSlideBar>
      )}
    </div>
  )
}

export default Patients
