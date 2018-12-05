import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import Modal from 'react-modal';
import { Heading, Button, Card, Text } from 'rebass';

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
      <Card
        m={4}
        mx="auto"
        px="auto"
        width={0.3}
        borderRadius={8}
        boxShadow="0 2px 16px rgba(0,0,0,0.25)"
      >
        <Heading color="lightgreen" textAlign="center">
          Purchase Stock
        </Heading>
        <form onSubmit={this.handleSubmit}>
          <Text>
            Stock Symbol
            {!this.state.symbol && <span className="warning">*Required</span>}
          </Text>
          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
          />
          <Text>
            Quantity
            {!this.state.quantity && <span className="warning">*Required</span>}
          </Text>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <hr />
          <Button
            type="submit"
            disabled={
              !this.state.symbol ||
              !this.state.quantity ||
              Number(this.state.quantity) % 1 !== 0
            }
            bg="green"
          >
            Buy
          </Button>{' '}
          <Button
            bg="gray"
            border="1"
            borderColor="black"
            color="black"
            type="button"
            onClick={this.onCancel}
          >
            Cancel
          </Button>
        </form>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <Confirm />
          <Button
            bg="gray"
            border="1"
            borderColor="black"
            color="black"
            type="button"
            onClick={this.onCancel}
          >
            Cancel
          </Button>
        </Modal>
      </Card>
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
