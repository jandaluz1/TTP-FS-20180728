import React from 'react';
import { connect } from 'react-redux';
import { Text, Heading, Button } from 'rebass';
import history from '../history';
import axios from 'axios';

import { clearOrder } from '../store/order';

const Confirm = props => {
  const order = props.order;
  const balance = props.balance;
  const newBalance = balance - order.price * Number(order.quantity);
  const onClick = async () => {
    await axios.post('/api/stocks/buy', props.order);
    props.clearOrder();
    history.push('/profile');
  };
  return order.price ? (
    <React.Fragment>
      <Heading>Order:</Heading>
      <Text>
        {order.symbol}: {order.name}
      </Text>
      <Text>
        {order.quantity} share(s) @ {order.price} per share
      </Text>
      <Text>Total: ${order.price * Number(order.quantity)}</Text>
      <Heading>
        New Balance: ${newBalance.toFixed(2)}
        {newBalance < 0 ? (
          <span>
            <Text className="warning">
              You do not have enough money to buy this many shares
            </Text>
          </span>
        ) : null}
      </Heading>

      <Button
        bg="green"
        type="button"
        disabled={newBalance < 0}
        onClick={onClick}
      >
        Confirm
      </Button>
    </React.Fragment>
  ) : (
    <Text>{order.symbol} does not exist</Text>
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
