import React, { useState } from 'react';
import { MessagesCollection} from '/imports/api/MessagesCollection';

export const MessageForm = ({user}) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!text) {
      return;
    } else {
     MessagesCollection.insert({
        text: text.trim(),
        createdAt: new Date(),
        userId: user._id
      });
      setText('');
    }
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a message...'
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type='submit'>Add Message</button>
    </form>
  );
};
