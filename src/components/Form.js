import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input
            onChange={this.props.onChange}
            type="name"
            name="name"
            placeholder="name"
            value={this.props.values.name}
          />
          <input
            onChange={this.props.onChange}
            type="password"
            name="password"
            placeholder="password"
            value={this.props.values.password}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
