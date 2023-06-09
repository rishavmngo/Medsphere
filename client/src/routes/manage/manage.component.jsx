import { useEffect, useState } from 'react'
import Dropdown from '../../component/dropdown/dropdown.componet'
import './manage.styles.css'
import DoctorsEntity from '../../component/doctorsEntity/doctorsEntity.component'
import PatientsEntity from '../../component/patientsEntity/patientsEntity.component'
import DepartmentEntity from '../../component/departmentEntity/departmentEntity.component'

const Manage = () => {
  const entity = [
    { id: 0, name: 'Doctors' },
    { id: 1, name: 'Patients' },
    { id: 2, name: 'Department' },
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
      case 2:
        return <DepartmentEntity />
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
    </div>
  )
}

export default Manage
