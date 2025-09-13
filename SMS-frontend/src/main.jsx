import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlansProvider } from "./context/PlansContext.jsx";

createRoot(document.getElementById('root')).render(
  <PlansProvider>
    <App />
  </PlansProvider>,
)
