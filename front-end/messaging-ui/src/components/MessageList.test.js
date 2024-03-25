import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageList from './MessageList';
import { AppContext } from '../Context';
import { AuthContext } from '../AuthContext';

describe('MessageList', () => {
  const mockHandleDeleteMessage = jest.fn();
  const mockOnEditMessage = jest.fn();
  const state = {
    messages: [
      { id: 1, content: 'Test Message 1', user: 'user1' },
      { id: 2, content: 'Test Message 2', user: 'user2' }
    ]
  };
  const userInfo = { username: 'user1' };

  it('renders messages correctly', () => {
    render(
      <AppContext.Provider value={{ state, handleDeleteMessage: mockHandleDeleteMessage }}>
        <AuthContext.Provider value={{ userInfo }}>
          <MessageList onEditMessage={mockOnEditMessage} />
        </AuthContext.Provider>
      </AppContext.Provider>
    );

    expect(screen.getByText('Test Message 1')).toBeInTheDocument();
    expect(screen.getByText('Test Message 2')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authorized user', () => {
    render(
      <AppContext.Provider value={{ state, handleDeleteMessage: mockHandleDeleteMessage }}>
        <AuthContext.Provider value={{ userInfo }}>
          <MessageList onEditMessage={mockOnEditMessage} />
        </AuthContext.Provider>
      </AppContext.Provider>
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls handleDelete with the right id', () => {
    render(
      <AppContext.Provider value={{ state, handleDeleteMessage: mockHandleDeleteMessage }}>
        <AuthContext.Provider value={{ userInfo }}>
          <MessageList onEditMessage={mockOnEditMessage} />
        </AuthContext.Provider>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: /trash/i })[0]);
    expect(mockHandleDeleteMessage).toHaveBeenCalledWith(1);
  });

});

