import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import LoginFormContainer from "./components/LoginFormContainer";
import SignupFormContainer from "./components/SignupFormContainer";

class App extends Component {
  state = {
    text: ""
  };

  stream = new EventSource("//localhost:4000/stream");

  componentDidMount() {
    // onmessage is a function that will run each time when the mew message comes
    this.stream.onmessage = event => {
      console.log("event test:", event.data);
      const action = JSON.parse(event.data);
      console.log(action);
      this.props.dispatch(action);
    };
  }

  onChange = event => {
    // const value =  event.target.value
    // const { value } = event.target // fancy way to do the same - destructuring
    //the faciest way is nested destructuring:
    const {
      target: { value }
    } = event;

    this.setState({ text: value });
  };

  reset = () => {
    this.setState({
      text: ""
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const url = "//localhost:4000/message";
    try {
      const response = await superagent
        .post(url)
        .set("Authorization", `Bearer ${this.props.user.jwt}`)
        .send({ text: this.state.text, userId: this.props.user.id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    this.reset();
  };

  render() {
    const { messages } = this.props;

    const list = messages.map(message => (
      <p key={message.id}>
        {message.user.name}: {message.text}
      </p>
    ));
    return (
      <main>
        {this.props.user ? (
          <p>You are logged in as {this.props.user.name}</p>
        ) : (
          <div>
            <h4>Please log in:</h4>
            <LoginFormContainer />
            <h4>Or sign up:</h4>
            <SignupFormContainer />
          </div>
        )}
        {this.props.user ? (
          <div>
            <h4>Send a message:</h4>
            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.text}
              />
              <button>Submit</button>{" "}
              {/* button inside the form submits form by default*/}
            </form>
            <button onClick={this.reset}>Reset</button>
          </div>
        ) : (
          <p>You can send messages after login</p>
        )}
        {list}
      </main>
    );
  }
}

// get data from store
function mapStateToProps(state) {
  // state is the current data in the redux store

  //Each property of the object becomes a props of the component
  if (state.user) {
    return {
      user: state.user,
      messages: state.messages //this.props.messages will be the entire state of the redux store
    };
  } else {
    return {
      messages: state.messages //this.props.messages will be the entire state of the redux store
    };
  }
}

// put data into the store
// we don't need it anymore, because we moved action creation to the server side
// const mapDispatchToProps = { allMessages }; // the action can be dispatched by running this.props.allMessages

// connect is a thunk
export default connect(mapStateToProps)(App);
