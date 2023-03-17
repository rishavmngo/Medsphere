import './inputField.styles.css'

const InputField = ({ label, ...rest }) => {
  return (
    <div className='input'>
      <input className='input__field' {...rest} placeholder=' ' />
      <span className='input__label'>{label}</span>
    </div>
  )
}

export default InputField
