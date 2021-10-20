import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/reducers/userSlice';

const drawerWidth = 260;

const AppBar = styled( MuiAppBar, {
  shouldForwardProp: ( prop ) => prop !== 'open',
} )( ( { theme, open } ) => ( {
  transition: theme.transitions.create( [ 'margin', 'width' ], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  } ),
  ...( open && {
    width: `calc(100% - ${ drawerWidth }px)`,
    marginLeft: `${ drawerWidth }px`,
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  } ),
} ) );

export default function Header() {
  const dispatch = useDispatch()

  const { user } = useSelector( state => state.user );

  return (
      <Box sx={ { display: 'flex' } }>
        <CssBaseline/>
        <AppBar position="fixed"
                open={ open }>
          <Toolbar>
            <Typography variant="h6"
                        component="div">
              <Link to="/"
                    className="disable-link"
                    style={ { color: 'white' } }>Shop</Link>
            </Typography>
            {!user.token ? <>
              <Typography variant="h6"
                          component="div">
                <Link to="/login"
                      className="disable-link"
                      style={ {
                        color: 'white',
                        marginLeft: 25,
                        marginRight: 25,
                      } }>Login</Link>
              </Typography>
              <Typography variant="h6"
                          component="div">
                <Link to="/register"
                      className="disable-link"
                      style={ { color: 'white' } }>Register</Link>
              </Typography>
            </> :  <IconButton onClick={ () => dispatch(logoutUser()) }>
              <ExitToAppIcon/>
            </IconButton>}
            { user.isAdmin && <Button variant={ 'text' }
                                      color={ 'secondary' }
                                      component={ Link }
                                      to="/users">Users</Button> }
          </Toolbar>
        </AppBar>
        <Toolbar/>
      </Box>
  );
}
