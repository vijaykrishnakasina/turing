import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../Context';
import { AuthContext } from '../AuthContext';
import { Form, Button } from 'react-bootstrap';

const MessageForm = ({ editMessage = null, onFinishEditing = () => {} }) => {
  const initialState = editMessage || { id: 0, content: '' };
  const [message, setMessage] = useState(initialState);
  const { handleAddMessage, handleEditMessage, } = useContext(AppContext);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (editMessage) {
      setMessage(editMessage);
    }
  }, [editMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...message, user: userInfo.username };
    editMessage ? handleEditMessage(payload) : handleAddMessage(payload);
    setMessage({ id: 0, content: '' });
    if (editMessage) onFinishEditing(); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={10}
          value={message.content}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          placeholder="Type your message here"
          className="mb-2 flex-grow-1"
        />
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">
            Send
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
