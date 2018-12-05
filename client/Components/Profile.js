import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Heading, Button } from 'rebass';

import { logout, me } from '../store/user';

import Portfolio from './Portfolio';

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    console.log(this.props.stocks);
    return (
      <React.Fragment>
        <Heading>Welcome {this.props.name}</Heading>
        {this.props.stocks ? (
          <Portfolio />
        ) : (
          <p>You do not know any stocks yet.</p>
        )}
        <h3>Balance: ${this.props.balance.toFixed(2)}</h3>
        <Link to="/profile/buy">
          <Button bg="green" type="button">
            Buy
          </Button>
        </Link>{' '}
        <Link to="/profile/history">
          <Button type="button">Orders</Button>
        </Link>{' '}
        <Button
          bg="gray"
          color="black"
          borderColor="black"
          border="1"
          type="button"
          onClick={this.props.logout}
        >
          Logout
        </Button>
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
