import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../store/user';
import { fetchStocks } from '../store/stocks';
import { me } from '../store/user';

class Profile extends Component {
  componentDidMount() {
    this.props.loadStocks();
    this.props.loadUser();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello, {this.props.name}</h1>
        <h3>Owned Stocks</h3>
        {Object.keys(this.props.stocks)[0] ? (
          Object.keys(this.props.stocks).map((stock, idx) => (
            <p key={idx}>
              {stock} {this.props.stocks[stock]}
            </p>
          ))
        ) : (
          <p>You don't own any stocks</p>
        )}
        <h3>Balance: ${this.props.balance.toFixed(2)}</h3>
        <Link to="/profile/buy">Buy Stocks</Link>
        <button onClick={this.props.logout}>Logout</button>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  name: state.user.name,
  balance: state.user.balance,
  stocks: state.portfolio
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  loadStocks: () => dispatch(fetchStocks()),
  loadUser: () => dispatch(me())
});

export default connect(
  mapState,
  mapDispatch
)(Profile);
