import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LabStateProvider } from './state/labState'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LabStateProvider>
      <App />
    </LabStateProvider>
  </StrictMode>,
)
