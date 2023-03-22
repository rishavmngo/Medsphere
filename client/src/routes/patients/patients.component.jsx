import { useContext, useState } from 'react'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import './patients.style.css'
const Patients = () => {
  const [somethingSlidebar, setSomethingSlidebar] = useState(false)

  function handleSlideBar() {
    setSomethingSlidebar(!somethingSlidebar)
  }
  return (
    <div>
      Patients
      <button onClick={handleSlideBar}>toggle</button>
      <LeftSlideBar open={somethingSlidebar}>
        <div>patients component</div>
      </LeftSlideBar>
      )
    </div>
  )
}

export default Patients
