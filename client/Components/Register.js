import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { signUp } from '../store/user';

class Register extends Component {
  constructor() {
    super();
    this.state = { name: '', email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state);
    this.setState({ name: '', email: '', password: '' });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <hr />
        <button type="submit">Create Account</button>
      </form>
    );
  }
}

const mapDispatch = dispatch => ({
  signUp: user => {
    dispatch(signUp(user));
  }
});

export default connect(
  null,
  mapDispatch
)(Register);
