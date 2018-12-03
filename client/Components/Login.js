import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../store/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
    this.setState({ email: '', password: '' });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <br />
        <hr />
        <button type="submit">Login</button>
        <Link to="/signup">
          <button type="button">Create Account</button>
        </Link>
      </form>
    );
  }
}
const mapDispatch = dispatch => ({
  login: info => {
    dispatch(login(info));
  }
});
export default connect(
  null,
  mapDispatch
)(Login);
