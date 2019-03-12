import React, { Component } from "react";
import "./PreviewData.scss";
import CSVTEST from "../../csvtest";
import CSVTable from "../../Components/CSV Visualize/csv_table";

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
            {/* all you need to do here is get headers from csv as headers and the rest is data */}
            {/* <CSVTable headers={null} data={null} /> */}
            <CSVTEST />
            {/* ^ delete CSVTEST ^ */}
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
