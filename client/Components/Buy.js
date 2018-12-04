import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

import { fetchStock } from '../store/order';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = { symbol: '', quantity: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.buy(this.state.symbol, this.state.quantity);
    this.setState({ symbol: '', quantity: '' });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="symbol">Stock Symbol</label>
        <input
          type="text"
          name="symbol"
          value={this.state.symbol}
          onChange={this.handleChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button type="submit">Buy</button>
        <button>Cancel</button>
      </form>
    );
  }
}

const mapDispatch = dispatch => ({
  buy: (symbol, quantity) => dispatch(fetchStock(symbol, quantity))
});

export default connect(
  null,
  mapDispatch
)(Buy);
