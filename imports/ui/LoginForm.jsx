import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignup] = useState(false);

  const signUpOn = () => {
    setSignup(true);
  };

  const signUpOff = () => {
    setSignup(false);
  };

  const submit = (e) => {
    e.preventDefault();

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
        <button onClick={signUpOff} type='submit'>
          Log In
        </button>
      </div>
      <div>OR</div>
      <div>
        <button onClick={signUpOn} type='submit'>
          Sign Up
        </button>
      </div>
    </form>
  );
};
