import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../utilities/Firebase';
import * as ROUTES from '../../utilities/constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const SignUpPage = () => (
  <Grid container spacing={12} justify="center">
    <h1>SignUp</h1>
    <SignUpForm />
  </Grid>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      }).then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.FOUNDER);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Grid container spacing={12} justify="center">
        <form onSubmit={this.onSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-input"
              label="Name"
              type="text"
              name="username"
              margin="normal"
              variant="outlined"
              value={username}
              onChange={this.onChange}
            />
          </Grid>
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
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              placeholder="Password"
            />
          </Grid>
          <Grid container xs={12} justify="center">
            <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
              Sign Up
            </Button>
          </Grid>

          {error && <p>{error.message}</p>}
        </form>
      </Grid>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };