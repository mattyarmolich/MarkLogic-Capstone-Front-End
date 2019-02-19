import React, { Component } from "react";
import "./PreviewData.scss";

class PreviewData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="PreviewData-container">
        <div className="preview-view">
          <div className="Title-text">Data Preview</div>
          <div className="player-card-container">
            Preview for: (SELECTED FILE)
          </div>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>previous</button>
            <button onClick={this.props.nextStep}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewData;
