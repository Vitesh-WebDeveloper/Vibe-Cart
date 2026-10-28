import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'

// Find the HTML element with the id 'root' and render the React application inside it.
createRoot(document.getElementById('root')!).render(
<StrictMode>
    <App />
</StrictMode>
)
