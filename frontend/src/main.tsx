import './index.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { Toaster } from 'sonner'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Toaster />
            <App />
        </StrictMode>,
    )
}
