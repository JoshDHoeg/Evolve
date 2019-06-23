import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../utilities/constants/routes';
import { withAuthorization } from '../../../utilities/Session';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  const bull = <span className={classes.bullet}>•</span>;

  return(
    <Grid container spacing={12} justify="center" >
      <Grid container spacing={12} justify="center" className={classes.root}>
          <Grid item xs ={12} className={classes.imageWrapper}>
            <img src={logo} className={classes.image} />
          </Grid>
          <Typography variant="h1" className={classes.companyName}>
            Evolve
          </Typography>
          <Typography variant="h2" className={classes.companyDescription}>
            Evolve, is a company dedicated to the success of startups through the evolutionary theory of "evolve or die"
          </Typography>
          <Button variant="contained" color="primary" className={classes.button}>
            Company Website
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            <Link className={classes.link} to={ROUTES.COMPANY}>Save Profile</Link>
          </Button>
      </Grid>
      <Grid container spacing={12} justify="center" className={classes.founders}>
      </Grid>
    </Grid>
  )
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CompanyProfileEdit);