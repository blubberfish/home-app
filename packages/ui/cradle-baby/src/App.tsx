import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './Routes/Login'

export function App() {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )
}
