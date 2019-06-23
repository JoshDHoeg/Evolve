import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../utilities/constants/routes';
import { AuthUserContext } from '../../utilities/Session';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

 const NavigationAuth = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Evolve
          </Typography>
          <Button color="inherit"><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button color="inherit"><Link to={ROUTES.COMPANY}>Company</Link></Button>
          <Button color="inherit"><Link to={ROUTES.ACCOUNT}>Account</Link></Button>
          <Button color="inherit"><Link to={ROUTES.ADMIN}>Admin</Link></Button>
          <Button color="inherit"><SignOutButton /></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Evolve
          </Typography>
          <Button color="inherit"><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button color="inherit"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
          <Button color="inherit"><Link to={ROUTES.SIGN_UP}>Sign Up</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;