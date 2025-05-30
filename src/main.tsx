import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import GoogleAuthAppProvider from "./features/authorization/providers/GoogleAuthAppProvider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleAuthAppProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleAuthAppProvider>
  </StrictMode>
)
