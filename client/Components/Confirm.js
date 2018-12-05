import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import axios from 'axios';

import { clearOrder } from '../store/order';

const Confirm = props => {
  const order = props.order;
  const balance = props.balance;
  const newBalance = balance - order.price * Number(order.quantity);
  console.log('QUANTITY', typeof order.quantity);
  const onClick = async () => {
    await axios.post('/api/stocks/buy', props.order);
    props.clearOrder();
    history.push('/profile');
  };
  return (
    <React.Fragment>
      <h1>Order:</h1>
      <h3>
        {order.symbol}: {order.name} @ {order.price} per share
      </h3>
      <h3>Total: ${order.price * Number(order.quantity)}</h3>
      <br />
      <h2>New Balance: ${newBalance}</h2>
      <button type="button" disabled={newBalance < 0} onClick={onClick}>
        Confirm
      </button>
    </React.Fragment>
  );
};

const mapState = state => ({
  order: state.order,
  balance: state.user.balance
});

const mapDispatch = dispatch => ({
  clearOrder: () => dispatch(clearOrder())
});

export default connect(
  mapState,
  mapDispatch
)(Confirm);
