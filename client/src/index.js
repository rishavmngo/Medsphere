import ReactDom from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth.context'
import StaticCompProvider from './context/staticComp.context'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <StaticCompProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StaticCompProvider>
  </AuthProvider>
)
