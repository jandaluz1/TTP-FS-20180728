import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Text, Heading, Button } from 'rebass';
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
        <Heading>Transaction History</Heading>
        <table>
          <thead>
            <tr>
              <td>
                <Text>Stock</Text>
              </td>
              <td>
                <Text>Type</Text>
              </td>
              <td>
                <Text>Quantity</Text>
              </td>
              <td>
                <Text>Price per Share</Text>
              </td>
              <td>
                <Text>TOTAL</Text>
              </td>
            </tr>
          </thead>
          <tbody>
            {orders[0] ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <Text>
                      {order.name}({order.symbol})
                    </Text>
                  </td>
                  <td>
                    <Text>{order.type}</Text>
                  </td>
                  <td>
                    <Text>{order.quantity}</Text>
                  </td>
                  <td>
                    <Text>{order.price}</Text>
                  </td>
                  <td>
                    <Text>{(order.price * order.quantity).toFixed(2)}</Text>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <Text>You have not ordered anything yet</Text>
              </tr>
            )}
          </tbody>
        </table>
        <Link to="/profile">
          <Button
            borderColor="black"
            border="1"
            bg="gray"
            color="black"
            type="button"
          >
            Back to profile
          </Button>
        </Link>
      </div>
    );
  }
}

export default History;
