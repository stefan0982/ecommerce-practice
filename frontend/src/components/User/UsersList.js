import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

export default function UsersList( { users } ) {
  return (
      <List sx={ {
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
      } }>
        { users?.users?.map( ( { name, email, _id, isAdmin } ) => (
            <Fragment key={ _id }>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  { isAdmin ?
                      <AccountCircleTwoToneIcon fontSize={ 'large' }/> :
                      <AccountCircleOutlined fontSize={ 'large' }/> }
                </ListItemAvatar>
                <ListItemText
                    primary={ name }
                    secondary={ email }
                />
              </ListItem>
              <Divider variant="inset"
                       component="li"/>
            </Fragment>
        ) ) }
      </List>
  );
}
