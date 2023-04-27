import './group3.style.css'
function Group3() {
  return (
    <div className='group3'>
      <div className='medicineTable'>
        <div className='medicineTable-head'>
          <span className='medicineTable-col-head'>Medicine Name</span>
          <span className='medicineTable-col-head'>Dosage</span>
          <span className='medicineTable-col-head'>Duration</span>
        </div>

        <div className='medicineTable-body'>
          <div className='medicineTable-body-row'>
            <div className='medicine-data'>
              <span className='medicineName'>1. TAB Dolo</span>
              <span className='medicineDosage'>1 Morning, 1 Night</span>
              <span className='medicineDuration'>10 days</span>
            </div>
          </div>
        </div>
        <div className='medicineTable-footer'></div>
      </div>
    </div>
  )
}
export default Group3
