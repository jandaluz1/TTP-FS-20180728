import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Login, Register, Profile } from './Components';
import { me } from './store/user';

class Routes extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    console.log(this.props.loggedIn);
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        {this.props.loggedIn && (
          <Switch>
            <Route path="/profile" component={Profile} />
          </Switch>
        )}
      </Switch>
    );
  }
}

const mapState = state => ({
  loggedIn: !!state.user._id
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
