import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        avatar: avatar
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        {/* select user avatar */}
        <fieldset onChange={(evt)=>setAvatar(evt.target.value)}>
          <legend>Select avatar:</legend>
          <div>
            <input type="radio" id="/svg/avatars/acorns.svg" name="avatar" 
              value="/svg/avatars/acorns.svg"
               />
              
            <label htmlFor="/svg/avatars/acorns.svg"><img className='selectAvatar' 
              src='/svg/avatars/acorns.svg' /></label>
          </div>

          <div>
            <input type="radio" id="/svg/avatars/basket.svg" name="avatar" 
              value="/svg/avatars/basket.svg" />
            <label htmlFor="/svg/avatars/basket.svg"><img className='selectAvatar' 
              src='/svg/avatars/basket.svg' /></label>
          </div>

          <div>
            <input type="radio" id="/svg/avatars/oak-tree.svg" name="avatar" 
            value="/svg/avatars/oak-tree.svg" />
            <label htmlFor="/svg/avatars/oak-tree.svg"><img className='selectAvatar'
              src='/svg/avatars/oak-tree.svg' /></label>
          </div>

          <div>
            <input type="radio" id="/svg/avatars/evergreen-tree.svg" name="avatar" 
            value="/svg/avatars/evergreen-tree.svg" />
            <label htmlFor="/svg/avatars/evergreen-tree.svg"><img className='selectAvatar'
              src='/svg/avatars/evergreen-tree.svg' /></label>
          </div>

          <div>
            <input type="radio" id="/svg/avatars/tree-1.svg" name="avatar" 
            value="/svg/avatars/tree-1.svg" />
            <label htmlFor="/svg/avatars/tree-1.svg"><img className='selectAvatar'
              src='/svg/avatars/tree-1.svg' /></label>
          </div>
        </fieldset>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
