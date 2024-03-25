// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import './App.css'; 
import Login from './Login';
import MessageBoard from './components/MessageBoard';

function App() {
  const { userInfo, setError } = useContext(AuthContext);

  return (
    <>
      {userInfo && userInfo.errorMessage &&
        <div className="alert alert-danger alert-dismissible" role="alert">
          {userInfo.errorMessage}
          <button type="button" className="close" aria-label="Close" onClick={() => { setError('') }}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}
      <Router>
        <Routes>
          <Route path="/login" element={userInfo.isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={userInfo.isAuthenticated ? <MessageBoard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>

    </>
  );
};


export default App;
