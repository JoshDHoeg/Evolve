import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../utilities/Firebase';
import * as ROUTES from '../../utilities/constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const SignInPage = () => (
  <Grid container spacing={12} justify="center">
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Grid>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    
    const isInvalid = password === '' || email === '';

    return (
      <Grid container spacing={12} justify="center">
        <form onSubmit={this.onSubmit}>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Grid>
        <Grid container spacing={12} justify="center">
          <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
            Sign In
          </Button>
        </Grid>

          {error && <p>{error.message}</p>}
        </form>
      </Grid>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };