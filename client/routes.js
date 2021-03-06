import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Login, Register, Profile, Buy, History } from './Components';
import { me } from './store/user';

class Routes extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        {this.props.loggedIn && (
          <Switch>
            <Route path="/profile/buy" component={Buy} />
            <Route path="/profile/history" component={History} />
            <Route path="/profile" component={Profile} />
          </Switch>
        )}
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    );
  }
}

const mapState = state => ({
  loggedIn: !!state.user.name
});

const mapDispatch = dispatch => ({
  loadData: () => dispatch(me())
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
