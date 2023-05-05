import { useContext, useEffect, useRef, useState } from 'react'
import { MedicineContext } from '../../context/inventory.context'
import { GiMedicines } from 'react-icons/gi'
import InputField from '../inputField/inputField.component'
import handleOutside from '../../utils/handleOutside.js'
import MedicineList from '../medicineList/medicineList.component'
import './inventoryEntity.style.css'
const defaultMedicineForm = {
  brand_name: '',
  dosageform: '',
  generic: '',
  quantity: '',
  manufacturer: '',
  type: '',
}
const InventoryEntity = () => {
  const inventoryOverlay = useRef(0)
  const inventoryButton = useRef(0)
  const addMedicineRef = useRef(0)
  const DeleteOverlayDialogueRef = useRef(0)
  const {
    getMedicinesForOrg,
    medicines,
    addMedicines,
    updateMedicine,
    deleteMedicine,
  } = useContext(MedicineContext)
  const [showInventoryOverlay, toggleInventoryOverlay] = useState(false)
  const [showDeleteOverlayDialogue, toggleDeleteOverlayDialogue] =
    useState(false)
  const [medicineForm, setMedicineForm] = useState(defaultMedicineForm)
  const [itemToDelete, setItemToDelete] = useState({})
  const [itemToUpdate, setItemToUpdate] = useState({})

  const handleMedicineForm = (e) => {
    const { name, value } = e.target
    setMedicineForm({ ...medicineForm, [name]: value })
  }
  const sumbitMedicineForm = () => {
    addMedicines(medicineForm)
    setMedicineForm(defaultMedicineForm)
  }

  const sumbitMedicineFormUpdate = () => {
    updateMedicine({ ...medicineForm, id: itemToUpdate.id })
    setMedicineForm(defaultMedicineForm)
    toggleInventoryOverlay(false)
  }
  useEffect(() => {
    getMedicinesForOrg()
  }, [])
  useEffect(() => {
    handleOutside(inventoryOverlay, toggleInventoryOverlay, [
      inventoryButton,
      addMedicineRef,
    ])
  }, [inventoryButton, inventoryOverlay, addMedicineRef])

  const handleDelete = (item) => {
    toggleDeleteOverlayDialogue(true)
    setItemToDelete(item)
  }
  const DeleteItem = () => {
    deleteMedicine(itemToDelete.id)
    toggleDeleteOverlayDialogue(false)
  }
  const handleUpdate = (item) => {
    toggleInventoryOverlay(true)
    setMedicineForm(item)
    setItemToUpdate(item)
    console.log(item)
  }
  return (
    <div className='inventoryEntity'>
      <MedicineList
        medicines={medicines}
        Delete={handleDelete}
        Edit={handleUpdate}
      />
      <div
        ref={inventoryOverlay}
        className='inventory-overlay'
        style={{
          opacity: !showInventoryOverlay ? '0' : '1',
          visibility: !showInventoryOverlay ? 'hidden' : 'visible',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <div className='inventory-title'>
          {itemToUpdate ? 'Update Medicine' : 'Add Medicines'}
        </div>
        <div className='overlay-inventory-grid'>
          <div>
            <InputField
              label='Brand name'
              name='brand_name'
              value={medicineForm['brand_name']}
              onChange={handleMedicineForm}
            />
            <InputField
              label='Type'
              value={medicineForm['type']}
              name='type'
              onChange={handleMedicineForm}
            />
          </div>
          <div>
            <InputField
              label='Dosage form'
              name='dosageform'
              value={medicineForm['dosageform']}
              onChange={handleMedicineForm}
            />
            <InputField
              label='Generic'
              name='generic'
              value={medicineForm['generic']}
              onChange={handleMedicineForm}
            />
          </div>
          <div>
            <InputField
              label='Manufacturer'
              name='manufacturer'
              value={medicineForm['manufacturer']}
              onChange={handleMedicineForm}
            />
            <InputField
              label='Quantity'
              name='quantity'
              value={medicineForm['quantity']}
              onChange={handleMedicineForm}
            />
          </div>
        </div>

        {itemToUpdate ? (
          <div
            className='inventory-button'
            ref={inventoryButton}
            onClick={sumbitMedicineFormUpdate}
          >
            Update
          </div>
        ) : (
          <div
            className='inventory-button'
            ref={inventoryButton}
            onClick={sumbitMedicineForm}
          >
            Add
          </div>
        )}
      </div>

      <button
        ref={addMedicineRef}
        className='addManager-btn'
        onClick={() => {
          setItemToUpdate(null)
          setMedicineForm(defaultMedicineForm)
          toggleInventoryOverlay(!showInventoryOverlay)
        }}
      >
        <span className='addManager-btn-icon'>
          <GiMedicines />
        </span>
        <span className='addManger-btn-label'>Add Medicines</span>
      </button>
      <div
        className='DeleteOverlay'
        ref={DeleteOverlayDialogueRef}
        style={{
          opacity: !showDeleteOverlayDialogue ? '0' : '1',
          visibility: !showDeleteOverlayDialogue ? 'hidden' : 'visible',
          transition: 'opacity 0.1s ease-in',
        }}
      >
        <div className='DeleteContainer'>
          <h3 className='DeleteContainer--title'>Are you sure?</h3>
          <div className='DeleteContainer__buttons'>
            <div className='DeleteContainer__buttons--yes' onClick={DeleteItem}>
              yes
            </div>
            <div
              className='DeleteContainer__buttons--no'
              onClick={() => toggleDeleteOverlayDialogue(false)}
            >
              no
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InventoryEntity
