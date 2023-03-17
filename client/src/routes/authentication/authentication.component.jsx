import './authentication.style.css'
import Register from '../../component/register/register.component.jsx'
import { useState } from 'react'
import Login from '../../component/signin/signin.component'
const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='Authentication-page'>
      <div className='Authentication-container'>
        <div className='Authentication-poster'>
          <div className='Authentication-poster-foreground'>
            <div className='Authentication-poster-title'>Medsphere</div>
            <div className='Authentication-poster-desp'>
              Manage your day to day medical affairs
            </div>
          </div>
        </div>
        <div className='Authentication-type'>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Authentication
