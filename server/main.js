import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { MessagesCollection } from '/imports/api/MessagesCollection';

const insertMessage = (messageText, user) =>
  MessagesCollection.insert({
    text: messageText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (MessagesCollection.find().count() === 0) {
    [
      'Message One!',
      'Message Two!',
      'Message Three!',
      'Message Four!',
      'Message Five!',
    ].forEach(messageText => insertMessage(messageText, user));
  }
});