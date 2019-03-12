import React, { Component } from "react";
import "./PreviewData.scss";
import CSVTEST from "../../csvtest";
import CSVTable from "../../Components/CSV Visualize/csv_table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import * as loadingActions from "../../utils/actions/loadingAction";
import { Switch, Route, withRouter } from "react-router-dom";

class PreviewData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selected !== undefined &&
      this.props.selected !== null &&
      nextProps.isActive
    ) {
      console.log(this.props.selected.file_links);
      //^ contains the s3 link, go ahead and download it and put it in the state and do whatever you need to do to it
    }
  }

  startClassifying = () => {
    this.props.loadingActions.setLoading(true);
    this.props.nextStep();
  };
  render() {
    return (
      <div className="PreviewData-container">
        <div className="preview-view">
          <div className="Title-text">
            <div>
              Data Preview:
              {this.props.selected && (
                <div>{this.props.selected.file_names}</div>
              )}
            </div>
          </div>
          <div className="player-card-container">
            {/* all you need to do here is get headers from csv as headers and the rest is data */}
            {/* <CSVTable headers={null} data={null} /> */}
            <CSVTEST />
            {/* ^ delete CSVTEST ^ */}
          </div>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>Back</button>
            <button onClick={() => this.startClassifying()}>
              Classify Data
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.s3.files,
    selected: state.s3.selected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PreviewData)
);
