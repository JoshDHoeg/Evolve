import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../utilities/Firebase';
import * as ROUTES from '../../utilities/constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const PasswordForgetPage = () => (
  <Grid container spacing={12} justify="center">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
    </Grid>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

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
              value={this.state.email}
              onChange={this.onChange}
            />
          </Grid>
          <Grid container xs={12} justify="center">
            <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
              Reset My Password
            </Button>
          </Grid>
          {error && <p>{error.message}</p>}
        </form>
      </Grid>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };