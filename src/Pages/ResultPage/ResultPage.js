import React, { Component } from 'react';
import './ResultPage.scss';
import axios from 'axios';

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="result-container">
        <div className="results-view">
          Results
          <button onClick={this.props.previousStep}>previous</button>
        </div>
      </div>

    )
  }
}

export default ResultPage;
