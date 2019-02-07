import React, { Component } from "react";
import "./ResultPage.scss";
import axios from "axios";

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="result-container">
        <div className="results-view">
          <div className="Title-text">Results</div>
          <div className="player-card-container">Player Cards</div>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>previous</button>
            <button onClick={this.props.previousStep}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;
