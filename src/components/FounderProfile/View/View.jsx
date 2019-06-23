import React, { useState, useEffect } from 'react'
import { withAuthorization } from '../../../utilities/Session';
import logo from '../../../assets/logo.png';
import firebase from 'firebase'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../utilities/constants/routes';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

// class FounderProfile extends Component {
//     constructor(props) {
//         super(props)
//         this.state ={
//             loading: false,
//             user:{
//                 name: '',
//                 email: '',
//                 company: '',
//                 revenue: []
//             }
//         }
//     }

//     componentDidMount() {
//         this.setState({loading: true});
//         let uid = firebase.auth().currentUser.uid
//         this.props.firebase.user(uid).on('value', snapshot => {
//             const userObject = snapshot.val()
//             this.setState({
//                 loading: false,
//                 user: userObject
//             })
//             console.log('user', userObject.email)
//         });
//     }


//     componentWillUnmount() {
//         this.props.firebase.user().off();
//     }

//     render() {
//         console.log('hello')
//         return (
//             <div>
//                 <h2>User: {this.state.user.username}</h2>
//                 <h2>Email: {this.state.user.email}</h2>
//                 <h2>Company: {this.state.user.company}</h2>
//                 <h2>Revenue: {this.state.user.revenue}</h2>
//             </div>
//         )
//     }
// }
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

const FounderProfile = (props) => {
    const classes = useStyles();

    const [user, setUser] = useState({ name: '', email: '', company: '', revenue: [] });

    useEffect(() => {
        let uid = firebase.auth().currentUser.uid
        props.firebase.user(uid).on('value', snapshot => {
            const userObject = snapshot.val()
            setUser(userObject);
            console.log('user', userObject.email)
        });

        return () => {
            props.firebase.user().off();
        };
    })
    
  
    return(
      <Grid container spacing={12} justify="center" >
        <Grid container spacing={12} justify="center" className={classes.root}>
            <Grid item xs ={12} className={classes.imageWrapper}>
              <img src={logo} className={classes.image} />
            </Grid>
            <Typography variant="h1" className={classes.companyName}>
              {user.name}
            </Typography>
            <Typography variant="h2" className={classes.companyDescription}>
                {user.email}
            </Typography>
            <Typography variant="h2" className={classes.companyDescription}>
                {user.company}
            </Typography>
            <Typography variant="h2" className={classes.companyDescription}>
                {user.revenue}
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
              Company Website
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.link} to={ROUTES.COMPANY_EDIT}>Edit Profile</Link>
            </Button>
        </Grid>
      </Grid>
    )
  };

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FounderProfile)