import React, { Component } from "react";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    // onmessage is a function that will run each time when the mew message comes
    this.stream.onmessage = event => {
      console.log("event test:", event.data);
      const parsed = JSON.parse(event.data);
      console.log(parsed);
    };
  }
  render() {
    return <div>client</div>;
  }
}

export default App;
