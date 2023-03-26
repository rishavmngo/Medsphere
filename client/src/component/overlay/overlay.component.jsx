import './overlay.style.css'
const Overlay = ({ children }) => {
  return (
    <div className='overlayContainer'>
      <div className='overlay-msg-box'>{children}</div>
    </div>
  )
}

export default Overlay
