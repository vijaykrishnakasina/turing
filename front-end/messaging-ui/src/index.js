// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './Context';
import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>

      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
