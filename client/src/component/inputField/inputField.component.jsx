import './inputField.styles.css'

const InputField = ({ label, innerRef = null, ...rest }) => {
  return (
    <div className='input' ref={innerRef}>
      <input className='input__field' {...rest} placeholder=' ' />
      <span className='input__label'>{label}</span>
    </div>
  )
}

export default InputField
