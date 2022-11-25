import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container sx={{marginBottom:'20px'}}>
      <form className="formPanel" onSubmit={login}>
        <h2 className='login-title'>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <TextField 
          required
          fullWidth
          id="username"
          label="username"
          name="username"
          autoComplete=""
          size="small"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField 
        required
        fullWidth
        id="password"
        label="password"
        name="password"
        autoComplete=""
        size="small"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Don't have an account? Sign Up Here!
        </button>
      </center>
    </Container>
  );
}

export default LoginForm;
