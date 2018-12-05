import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class History extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  async componentDidMount() {
    const res = await axios.get('/api/user/orders');
    const orders = res.data;
    this.setState({ orders });
  }
  render() {
    const orders = this.state.orders;
    return (
      <div>
        <h1>Transaction History</h1>
        <table>
          <thead>
            <tr>
              <td>Stock</td>
              <td>Type</td>
              <td>Quantity</td>
              <td>Price per Share</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
            {orders[0] ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>
                    {order.name}({order.symbol})
                  </td>
                  <td>{order.type}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{(order.price * order.quantity).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>You have not ordered anything yet</tr>
            )}
          </tbody>
        </table>
        <Link to="/profile">
          <button type="button">Back to profile</button>
        </Link>
      </div>
    );
  }
}

export default History;
