import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MessagesCollection } from '/imports/api/MessagesCollection';
import { Message } from './Message';
import { MessageForm } from './MessageForm';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  //hide completed returns only unchecked elements
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  // const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const messages = useTracker(() => {
    if (!user) {
      return [];
    }

    return MessagesCollection.find(
      // hideCompleted ? pendingOnlyFilter :
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const deleteMessage = ({ _id }) => {
    const Message = MessagesCollection.findOne(_id);

    if (Message.userId === user._id) {
      MessagesCollection.remove(_id);
    } else {
      alert('Cannot Delete other users messages!');
    }
  };

  const logout = () => Meteor.logout();

  return (
    <div className='app'>
      <header>
        <div className='app-bar'>
          <div className='app-header'>
            <h1>FakeBook </h1>
          </div>
        </div>
      </header>
      <div className='main'>
        {user ? (
          <Fragment>
            <div className='user'>
              {user.username}
              <button className='logOut' onClick={logout}>
                Log Out
              </button>
            </div>
            <MessageForm user={user} />

            <ul className='tasks'>
              {messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  currentUser={user._id}
                  onDeleteClick={deleteMessage}
                  createdAt={message.createdAt}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
