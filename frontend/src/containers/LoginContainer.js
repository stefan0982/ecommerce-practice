import React from 'react';
import LoginForm from '../components/LoginForm';
import { Grid } from '@mui/material';

const LoginContainer = () => {
  return (
      <Grid container
            justifyContent={ 'center' }
            alignContent={ 'center' } minHeight="85vh">
        <LoginForm/>
      </Grid>
  );
};

export default LoginContainer;
