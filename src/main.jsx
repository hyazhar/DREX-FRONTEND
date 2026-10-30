import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx'
import ScrollToTop from './ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>,
    </AuthProvider>
)
