import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProviderWrapper } from './contexts/user.context.jsx'
import { LanguageProviderWrapper } from './contexts/language.context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProviderWrapper>
      <UserProviderWrapper>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </UserProviderWrapper>
    </LanguageProviderWrapper>
  </StrictMode>,
)