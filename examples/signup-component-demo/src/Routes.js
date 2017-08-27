import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import NotFound from './pages/NotFound';
import CognitoSignup from '@mitchallen/react-cognito-signup';

// <AppliedRoute path='/' exact component={CognitoSignup} props={childProps} />

/*
 * You must also modify src/index.js (see this projects example)
 */

const Routes = ({ childProps }) => (
  <Switch>
    <AppliedRoute path='/signup' exact component={CognitoSignup} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
     <Route component={NotFound} />
  </Switch>
);

Routes.propTypes = {
  childProps: PropTypes.object
};

export default Routes;