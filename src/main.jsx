import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserProvider.jsx'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { IdProvider } from './context/IdProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <IdProvider>
        <UserProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </UserProvider>
      </IdProvider>
    </HashRouter>
  </React.StrictMode>,
)
