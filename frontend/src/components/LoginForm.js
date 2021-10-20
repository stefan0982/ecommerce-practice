import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { loginUser } from '../api/apiRequests';
import { setUser } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const history = useHistory();
  const onSubmit = data => {
    loginUser(data).then( ({ data }) => {
      dispatch(setUser(data))
      history.push('/')
    })
  }

  return (
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
          <Controller
              name="email"
              control={ control }
              defaultValue=""
              rules={{ required: true, pattern }}
              render={ ( { field } ) =>
                  <TextField
                      { ...field }
                      label="Email"
                      margin={'normal'}
                      error={!!errors.email}
                      helperText={errors.email && 'This should be a valid email'}
                  />
              }
          />
          <Controller
              name="password"
              control={ control }
              defaultValue=""
              rules={{ required: true, minLength: 5 }}
              render={ ( { field } ) =>
                  <TextField
                      { ...field }
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      margin={'normal'}
                      error={!!errors.password}
                      helperText={errors.password && 'Password should be at least 5 characters'}
                  />
              }
          />
        </div>
        <Button type="submit"
                variant="contained" fullWidth>Login</Button>
      </form>
  );
};

export default LoginForm;
