import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
// import './index.css'
import { UserProvider } from "./context/UserContext"
import { SnackbarProvider } from 'notistack';
import { ViewProvider } from './context/ViewContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ViewProvider>
      <UserProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </UserProvider>
    </ViewProvider>
  </BrowserRouter>
)
