import React, { Component } from "react";
import "./Loading.scss";
import axios from "axios";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="loading-container">
        <div className="loading-view">
          <div className="Title-text">Loading</div>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>previous</button>
            <button onClick={this.props.nextStep}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
