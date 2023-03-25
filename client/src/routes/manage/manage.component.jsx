import { useEffect, useState } from 'react'
import Dropdown from '../../component/dropdown/dropdown.componet'
import './manage.styles.css'
import DoctorsEntity from '../../component/doctorsEntity/doctorsEntity.component'
import PatientsEntity from '../../component/patientsEntity/patientsEntity.component'

const Manage = () => {
  const entity = [
    { id: 0, name: 'Doctors' },
    { id: 1, name: 'Patients' },
    { id: 3, name: 'department' },
  ]
  const [entities, setEntities] = useState(entity)

  const [currentEntity, setCurrentEntity] = useState({
    value: entities[0].name,
    id: entities[0].id,
  })

  function giveEntity(id) {
    switch (id) {
      case 0:
        return <DoctorsEntity />
      case 1:
        return <PatientsEntity />
    }
  }

  return (
    <div className='manage-container'>
      <Dropdown
        values={entities}
        currentItem={currentEntity}
        setCurrentItem={setCurrentEntity}
        maxWidth={'70px'}
        minWidth={'70px'}
      />
      {giveEntity(currentEntity.id)}

      {/* {currentEntity.id === 0 && <DoctorsEntity />} */}
      {/* {currentEntity.id === 1 && <PatientsEntity />} */}
    </div>
  )
}

export default Manage
