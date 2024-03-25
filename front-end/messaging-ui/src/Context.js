import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
export const AppContext = createContext();


const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'EDIT_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id ? action.payload : msg
        ),
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(msg => msg.id !== action.payload),
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {

  const { userInfo, setError} = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/messages');
        dispatch({ type: 'SET_MESSAGES', payload: response.data });
      } catch (ex) {
        console.error('Error fetching messages:', ex);
        setError(ex.error || ex.message || 'Error');
      }
    };

    fetchMessages();
  }, []);

  const handleAddMessage = async (message) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/messages', message);
      dispatch({ type: 'ADD_MESSAGE', payload: response.data });
    } catch (ex) {
      console.error('Error adding message:', ex);
      setError(ex.error || ex.message || 'Error');
    }
  };

  const handleEditMessage = async (message) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/messages/${message.id}`, message);
      dispatch({ type: 'EDIT_MESSAGE', payload: response.data });
    } catch (ex) {
      console.error('Error editing message:', ex);
      setError(ex.error || ex.message || 'Error');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/messages/${id}`);
      dispatch({ type: 'DELETE_MESSAGE', payload: id });
    } catch (ex) {
      console.error('Error deleting message:', ex);
      setError(ex.error || ex.message || 'Error');
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, handleAddMessage, handleEditMessage, handleDeleteMessage }}>
      {children}
    </AppContext.Provider>
  );
};
