import './primary_btn.styles.css'
const ButtonPrime = ({ text, onClick }) => {
  return (
    <div className='ButtonPrime' onClick={onClick}>
      {text}
    </div>
  )
}

export default ButtonPrime
