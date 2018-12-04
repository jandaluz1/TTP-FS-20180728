import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import axios from 'axios';

import { clearOrder } from '../store/order';

const Confirm = props => {
  const order = props.order;
  console.log('QUANTITY', typeof order.quantity);
  const onClick = async () => {
    await axios.put('/api/user/buy', props.order);
    props.clearOrder();
    history.push('/profile');
  };
  return (
    <React.Fragment>
      <h1>Order:</h1>
      <h3>
        {order.symbol}: {order.name} @ {order.price} per share
      </h3>
      <h2>Total: {order.price * Number(order.quantity)}</h2>
      <br />
      <button type="button" onClick={onClick}>
        Confirm
      </button>
    </React.Fragment>
  );
};

const mapState = state => ({
  order: state.order
});

const mapDispatch = dispatch => ({
  clearOrder: () => dispatch(clearOrder())
});

export default connect(
  mapState,
  mapDispatch
)(Confirm);
