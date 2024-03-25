import React, { useContext, useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { AuthContext } from '../AuthContext';
function MessageBoard() {
  const { userInfo, logout, setError} = useContext(AuthContext);
  const [editingMessage, setEditingMessage] = useState(null);
  const handleLogout = () =>{
    logout();
  }
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Welcome {userInfo.username}</span>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </nav>

      <div className='row'>
        <div className="col-sm-4">

          <MessageList className="MessageList"
            onEditMessage={setEditingMessage}
            onFinishEditing={() => setEditingMessage(null)}
          />
        </div>

        <div className="col-sm-8">

          <MessageForm className="MessageForm"
            editMessage={editingMessage}
            onFinishEditing={() => setEditingMessage(null)}
          />
        </div>
      </div>

    </div>
  )
}

export default MessageBoard