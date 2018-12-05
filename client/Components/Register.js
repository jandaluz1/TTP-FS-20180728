import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Heading, Button, Text, Box } from 'rebass';
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
      <Card
        m={4}
        mx="auto"
        px="auto"
        width={0.3}
        borderRadius={8}
        boxShadow="0 2px 16px rgba(0,0,0,0.25)"
      >
        <Heading color="lightgreen" textAlign="center">
          Create Account
        </Heading>
        <form onSubmit={this.handleSubmit}>
          <Text>
            Name:
            {!this.state.name && <span className="warning">*Required</span>}
          </Text>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
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
          <hr />
          <Box mx="auto">
            <Button
              mx="auto"
              bg="green"
              type="submit"
              disabled={
                !this.state.name || !this.state.email || !this.state.password
              }
            >
              Create Account
            </Button>
          </Box>
        </form>
      </Card>
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
