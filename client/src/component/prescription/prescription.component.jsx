import './prescription.style.css'
import Group1 from '../group1/group1.component'
import Group2 from '../group2/group2.component'
import Group3 from '../group3/group3.component'
function Prescription() {
  return (
    <div className='prescription'>
      <div className='groups'>
        <Group1 />
        <Group2 />
        <Group3 />
      </div>
    </div>
  )
}

export default Prescription
