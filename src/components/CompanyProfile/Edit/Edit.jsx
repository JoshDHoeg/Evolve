import React from 'react';
import { useInput } from '../../../hooks/input-hook';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../utilities/constants/routes';
import { withAuthorization } from '../../../utilities/Session';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  imageWrapper: {
    width: '100%',
  },
  image: {
    display: 'block',
    width: '240px',
    margin: 'auto',
    padding: '24px',
  },
  companyName: {
    fontSize: '36px',
    fontWeight: 'bold',
    padding: '24px',
  },
  companyDescription: {
    fontSize: '24px',
    textAlign: 'center',
    paddingBottom: '24px',
  },
  founders: {
    paddingTop: '24px',
  },
  button: {
    margin: "0 12px 0 12px",
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  },
});

const CompanyProfileEdit = () => {
  const classes = useStyles();
  
  const { value:companyName, bind:bindCompanyName, reset:resetCompanyName } = useInput('');
  const { value:companyDescription, bind:bindCompanyDescription, reset:resetCompanyDescription } = useInput('');
  const { value:companyWebsite, bind:bindCompanyWebsite, reset:resetCompanyWebsite } = useInput('');

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${companyName} ${companyDescription} ${companyWebsite}`);
    resetCompanyName();
    resetCompanyDescription();
    resetCompanyWebsite();
}

  return(
    <Grid container spacing={12} justify="center" >
      <Grid container spacing={12} justify="center" className={classes.root}>
          <Grid item xs ={12} className={classes.imageWrapper}>
            <img src={logo} className={classes.image} />
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-input"
                label="companyName"
                type="text"
                name="companyName"
                margin="normal"
                variant="outlined"
                {...bindCompanyName}
            />
            <TextField
                id="outlined-input"
                label="companyWebsite"
                type="text"
                name="companyWebsite"
                margin="normal"
                variant="outlined"
                {...bindCompanyWebsite}
            />
            <TextField
                id="outlined-full-width"
                fullWidth
                label="companyDescription"
                type="text"
                name="companyDescription"
                margin="normal"
                variant="outlined"
                {...bindCompanyDescription}
            />

            <Button variant="contained" color="primary" className={classes.button} type="submit">
                <Link className={classes.link} to={ROUTES.COMPANY}>Save Profile</Link>
            </Button>
            </form>
        </Grid>
    </Grid>
  )
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CompanyProfileEdit);