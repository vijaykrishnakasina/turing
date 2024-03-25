import React, { useContext, useState } from 'react';
import { AppContext } from '../Context';
import { AuthContext } from '../AuthContext';

const MessageList = ({ onEditMessage }) => {
  const { state, handleDeleteMessage } = useContext(AppContext);
  const { userInfo} = useContext(AuthContext);

  const handleDelete = (id) => {
    handleDeleteMessage(id);
  };
  

  return (
    <div className="container mt-3">
      {state.messages.map((msg) => (
        <div className="row border-bottom pb-3" key={msg.id}>
          <div className="col-2 d-flex align-items-center"><i className="fas fa-duotone fa-user"></i></div>
          <div className="col-7 d-flex align-items-center"
            title={msg.content ? msg.content : ""}>
            {msg.content ? msg.content.substring(0, 20) : ""}
          </div>
          <div className="col-3 align-items-center" hidden= {msg.user !== userInfo.username}>
            <button className="btn btn-primary btn-sm" onClick={() => onEditMessage(msg)} ><i className="fas fa-edit"></i></button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(msg.id)}><i className="fas fa-trash"></i></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
