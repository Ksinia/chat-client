import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";

class App extends Component {
  state = {
    text: ""
  };

  stream = new EventSource("http://localhost:4000/stream");

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
    const url = "http://localhost:4000/message";
    const response = await superagent.post(url).send(this.state);
    console.log("response test:", response);
    this.reset();
  };

  render() {
    console.log("this.props.messages test", this.props.messages);

    const { messages } = this.props;

    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} type="text" value={this.state.text} />
          <button>Submit</button>{" "}
          {/* button inside the form submits form by default*/}
        </form>

        <button onClick={this.reset}>Reset</button>

        {list}
      </main>
    );
  }
}

// get data from store
function mapStateToProps(state) {
  // state is the current data in the redux store

  //Each property of the object becomes a props of the component
  return {
    messages: state //this.props.messages will be the entire state of the redux store
  };
}

// put data into the store
// we don't need it anymore, because we moved action creation to the server side
// const mapDispatchToProps = { allMessages }; // the action can be dispatched by running this.props.allMessages

// connect is a thunk
export default connect(mapStateToProps)(App);
