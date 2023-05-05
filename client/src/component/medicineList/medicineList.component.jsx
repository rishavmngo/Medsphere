import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import ManageTable from '../manageTable/manageTable.component'
import './medicineList.style.css'
const MedicineList = ({
  medicines,
  Edit = () => null,
  Delete = () => null,
}) => {
  return (
    <ManageTable
      body={medicines}
      columns={[
        'Brand name',
        'Type',
        'Dosage form',
        'Generic name',
        'Manufacturer',
        'Quantity',
      ]}
      bodyData={[
        'brand_name',
        'type',
        'dosageform',
        'generic',
        'manufacturer',
        'quantity',
      ]}
      pkey='id'
      actionArr={[
        { name: 'Edit', icon: <MdEdit />, func: Edit },
        { name: 'Delete', icon: <FaTrash />, func: Delete },
      ]}
    />
  )
}

export default MedicineList
