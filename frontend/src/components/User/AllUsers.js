import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/apiRequests';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import UsersList from './UsersList';

const AllUsers = () => {
  const { user } = useSelector(state => state.user)
  const [ data, setData ] = useState( [] );

  useEffect(() => {
    getAllUsers(user.token).then(res => setData(res.data))
  }, [])

  console.log(data);

  return (
      <Grid container justifyContent={'center'} marginTop={3}>
        <UsersList users={data}/>
      </Grid>
  );
};

export default AllUsers;
