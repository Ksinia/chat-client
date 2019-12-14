import React, { Component } from "react";
import { login } from "../actions";
import Form from "./Form";
import { connect } from "react-redux";

class LoginFormContainer extends Component {
  initialState = { name: "", password: "" };
  state = this.initialState;

  onSubmit = async event => {
    event.preventDefault();
    this.props.dispatch(login(this.state.name, this.state.password));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Form
        values={this.state}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      ></Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.jwt
  };
}

// connect is a thunk
export default connect(mapStateToProps)(LoginFormContainer);
