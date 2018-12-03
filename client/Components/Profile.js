import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../store/user';

const Profile = props => (
  <React.Fragment>
    <h1>Hello, {props.name}</h1>
    <p>number in test{props.stocks}</p>
    <button onClick={props.logout}>Logout</button>
  </React.Fragment>
);

const mapState = state => ({
  name: state.user.name,
  balance: state.user.balance,
  stocks: state.user.portfolio
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapState,
  mapDispatch
)(Profile);
