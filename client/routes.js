import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login, Register } from './Components';

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Register} />
  </Switch>
);

export default Routes;
