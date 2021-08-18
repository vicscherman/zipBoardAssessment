import React from 'react';

import { Accounts } from 'meteor/accounts-base';

export const Message = ({ message, onDeleteClick, currentUser }) => {
  let date = JSON.stringify(message.createdAt).toLocaleString()
  const user = Accounts.users.findOne({ _id: message.userId });
console.log(date)
  return (
    <li className ="fullMessage">
  
     
      <h4 className="postedBy">Posted By:</h4>
      {message.userId === currentUser ? (
        <span className="poster">Me</span>
      ) : (
        <span className="poster">{user.username}</span>
      )}
          <span className="post">{message.text}</span>
      <h4 className="postedBy">Posted At:</h4>
      <span className="poster">{date}</span>
      {message.userId === currentUser ? (
        <button onClick={() => onDeleteClick(message)}>&times;</button>
      ) : (
        ''
      )}
    </li>
  );
};
