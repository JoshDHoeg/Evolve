import React, { Component } from 'react';

import { withFirebase } from '../../utilities/Firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Grid container spacing={12} justify="center">
        <form onSubmit={this.onSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-password-input"
              label="New Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-password-input"
              label="Confirm New Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="passwordTwo"
              value={passwordTwo}
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

export default withFirebase(PasswordChangeForm);