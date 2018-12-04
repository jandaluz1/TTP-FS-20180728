import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import Modal from 'react-modal';
import Confirm from '../Components/Confirm';

import { fetchStock, clearOrder } from '../store/order';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = { symbol: '', quantity: '', modalIsOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.buy(this.state.symbol, this.state.quantity);
    this.setState({ symbol: '', quantity: '' });
    this.openModal();
  }
  onCancel() {
    this.props.cancel();
    this.closeModal();
    history.push('/profile');
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <React.Fragment>
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
          <button type="button" onClick={this.onCancel}>
            Cancel
          </button>
        </form>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <Confirm />
          <button type="button" onClick={this.onCancel}>
            Cancel
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  buy: (symbol, quantity) => dispatch(fetchStock(symbol, quantity)),
  cancel: () => dispatch(clearOrder())
});

export default connect(
  null,
  mapDispatch
)(Buy);
