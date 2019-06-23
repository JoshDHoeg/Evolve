import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase'


var prodConfig = {
    apiKey: "AIzaSyB4doVx79FOCd7vlSzq9iECor6m8y09qTc",
    authDomain: "evolve-8f239.firebaseapp.com",
    databaseURL: "https://evolve-8f239.firebaseio.com",
    projectId: "evolve-8f239",
    storageBucket: "",
    messagingSenderId: "156741667618",
    appId: "1:156741667618:web:2a37b0442119f810"
  };


  var devConfig = {
    apiKey: "AIzaSyB4doVx79FOCd7vlSzq9iECor6m8y09qTc",
    authDomain: "evolve-8f239.firebaseapp.com",
    databaseURL: "https://evolve-8f239.firebaseio.com",
    projectId: "evolve-8f239",
    storageBucket: "",
    messagingSenderId: "156741667618",
    appId: "1:156741667618:web:2a37b0442119f810"
  };

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }

    // *** Auth API ***

  companySelection = (Cid) => {
    let uid = firebase.auth().currentUser.uid
    this.props.firebase.user(uid).on('value', snapshot => {
      const userObject = snapshot.val()
      this.setState({
          loading: false,
          user: userObject
      })
      console.log('user', this.state.user)
  });
    this.props.firebase.founder(Cid).push({
      [uid]: true
    })
    this.props.firebase.user(uid).set({
      [Cid]: true
    })
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  company = uid => this.db.ref(`companies/${uid}`);
  companies = () => this.db.ref('companies');

  founder = (Cid) => this.db.ref(`companies/${Cid}/founders`)
  founders = () => this.db.ref('companies/founders')

  revenue = uid => this.db.ref(`revenues/${uid}`);
  revenues = () => this.db.ref('revenues');

}

export default Firebase;