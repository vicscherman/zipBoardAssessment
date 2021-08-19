import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignup] = useState(false);

  const toggleSignup = () => {
    setSignup(true);
  };

  const submit = (e) => {
    e.preventDefault();
    // Accounts.createUser({
    //   username: username,
    //   password: password,
    // });
    if (signUp === false) {
      Meteor.loginWithPassword(username, password);
    } else {
      Accounts.createUser({
        username: username,
        password: password,
      });

      Meteor.loginWithPassword(username, password);
    }
  };

  return (
    <form onSubmit={submit} className='login-form'>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          placeholder='Username'
          name='username'
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>

        <input
          type='password'
          placeholder='Password'
          name='password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>Log In</button>
      </div>
      <div>OR</div>
      <div>
        <button onClick={toggleSignup} type='submit'>
          Sign Up
        </button>
      </div>
    </form>
  );
};
