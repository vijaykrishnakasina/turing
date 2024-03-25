import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    username: null,
    accessToken : null,
    errorMessage : ''
  });

  const exchangeCodeForAccessToken = async (username, password) => {
    const url = 'http://127.0.0.1:5000/login';
    try {
        const response = await axios.post(url, {
          username,
          password,
        });
  
        const { access_token } = response.data;
        return {accessToken: access_token, isAuthenticated : true, errorMessage : ''};

      } catch (error) {
        
        console.error('Error logging in:', error);
        const errorMessage = error.response?.data?.error || error.response?.message || 'error';

        return {isAuthenticated : false, errorMessage}
      }
  }

  const login = async (username, password) => {

    const response = await exchangeCodeForAccessToken(username, password);
    console.log(response);
    setUserInfo({ ...response, username});
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;

  };

  const logout = () => {
    setUserInfo({ isAuthenticated: false, username: null , accessToken: null});
    delete axios.defaults.headers.common['Authorization'];
  };

  const setError = (errorMessage)=>{
    setUserInfo({...userInfo, errorMessage})
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
