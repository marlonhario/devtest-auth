import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import Register from '../Register/index';
import Activate from '../Register/components/Activate';
import ForgotPassword from '../ForgotPassword/index';
import ResetPassword from '../ForgotPassword/components/ResetPassword';
import ExamplePageOne from '../Example/index';
import ExamplePageTwo from '../ExampleTwo/index';

const Pages = () => (
  <Switch>
    <Route path="/pages/one" component={ExamplePageOne} />
    <Route path="/pages/two" component={ExamplePageTwo} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users/password/forget" component={ForgotPassword} />
        <Route exact path="/users/password/reset/:token" component={ResetPassword} />
        <Route exact path="/users/activate/:token" component={Activate} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
