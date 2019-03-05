import React, { Component } from "react";
import "./ExportPage.scss";
import axios from "axios";

class ExportPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="loading-container">
        <div className="loading-view">
          <div className="Title-text">Export</div>
          <div>
            <div>Download Classified Data</div>
            <button>Download</button>
          </div>
          <div className="bottom-part">
            <button onClick={this.props.firstStep}>Back to Beginning</button>
            <button onClick={this.props.previousStep}>previous</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExportPage;
