import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
<<<<<<< HEAD
import HomePage from '../Home';
import AccountPage from '../User/Edit/Edit';
=======
import CompanyProfile from '../CompanyProfile/View/View.jsx';
import CompanyProfileEdit from '../CompanyProfile/Edit/Edit.jsx';
import AccountPage from '../User/View/View';
>>>>>>> b04d31d2d4c54694b6c2fe478e7540a61306b517
import AdminPage from '../Admin';

import * as ROUTES from '../../utilities/constants/routes';
import { withAuthentication } from '../../utilities/Session';



const App = () => (
    <Router>
        <div>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.COMPANY} component={CompanyProfile} />
        <Route path={ROUTES.COMPANY_EDIT} component={CompanyProfileEdit} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);

export default withAuthentication(App);