import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout, me } from '../store/user';
import { fetchStocks } from '../store/stocks';

import Portfolio from './Portfolio';

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    console.log(this.props.stocks);
    return (
      <React.Fragment>
        <h1>Hello {this.props.name}</h1>
        {this.props.stocks ? (
          <Portfolio />
        ) : (
          <p>You do not know any stocks yet.</p>
        )}
        <h3>Balance: ${this.props.balance.toFixed(2)}</h3>
        <Link to="/profile/buy">
          <button type="button">Buy</button>
        </Link>
        <br />
        <Link to="/profile/history">
          <button type="button">Orders</button>
        </Link>
        <br />
        <button type="button" onClick={this.props.logout}>
          Logout
        </button>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  name: state.user.name,
  balance: state.user.balance,
  stocks: state.user.stocks
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  loadUser: () => dispatch(me())
});

export default connect(
  mapState,
  mapDispatch
)(Profile);
