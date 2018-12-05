import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Heading, Button, Text } from 'rebass';
import { connect } from 'react-redux';
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
      <Card
        m={4}
        mx="auto"
        px="auto"
        width={0.3}
        borderRadius={8}
        boxShadow="0 2px 16px rgba(0,0,0,0.25)"
      >
        <Heading color="lightgreen" textAlign="center">
          Login
        </Heading>

        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="email">Email:</label> */}
          <Text>
            Email:
            {!this.state.email && <span className="warning">*Required</span>}
          </Text>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          {/* <label htmlFor="password">Password:</label> */}
          <Text>
            Password:
            {!this.state.password && <span className="warning">*Required</span>}
          </Text>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <hr />
          <Button
            mx={4}
            type="submit"
            bg="green"
            disabled={!this.state.email || !this.state.password}
          >
            Login
          </Button>
          <Link mx={4} to="/signup">
            <Button>Create Account</Button>
          </Link>
        </form>
      </Card>
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
