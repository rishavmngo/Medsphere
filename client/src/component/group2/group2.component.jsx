function Group2({ data }) {
  const {
    patients_id,
    patients_name,
    patients_gender,
    timestamp,
    patients_age,
    patients_address,
  } = data

  const date = new Date(timestamp)
  const localFormat = date.toLocaleString().split(',')[0]

  return (
    <div className='group2'>
      <div className='PatientsDetail'>
        <div className='ColumnOne'>
          <div className='PatientsName'>
            <span>ID {patients_id} - </span>
            <span>{patients_name}</span>
            <span className='gender'>{`(${
              patients_gender && patients_gender[0].toUpperCase()
            })`}</span>
          </div>
          <div className='PatientsAge'>
            <span className='key'>Age: </span>
            <span className='value'>{patients_age}</span>
          </div>
          <div className='PatientsAddress'>
            <span className='key'>Add: </span>
            <span className='value'>{patients_address}</span>
          </div>
        </div>
        <div className='ColumnTwo'>
          <div className='TodayDate'>
            <span className='key'>Date: </span>
            <span className='value'>{localFormat}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Group2
