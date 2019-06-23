import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../utilities/constants/routes';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    card: {
      minWidth: 275,
      margin: '24px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    link: {
        textDecoration: 'none',
        color: '#000000',
      },
  });

const FounderCard = () => {
    const classes = useStyles();
    return(  
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Elon Musk
                </Typography>
                <Typography variant="h5" component="h2">
                CTO
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Elon@Evolve.io
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                555-555-5555
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link className={classes.link} to={ROUTES.FOUNDER}>View Profile</Link></Button>
            </CardActions>
        </Card>
    );
}

export default FounderCard;


