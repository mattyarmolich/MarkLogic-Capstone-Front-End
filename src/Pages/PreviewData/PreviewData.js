import React, { Component } from "react";
import "./PreviewData.scss";
import axios from "axios";
import Papa from "papaparse";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import * as mlActions from "../../utils/actions/mlActions";

import * as loadingActions from "../../utils/actions/loadingAction";
import { Switch, Route, withRouter } from "react-router-dom";

class PreviewData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parsedData: null
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selected !== undefined &&
      this.props.selected !== null &&
      nextProps.isActive
    ) {
      console.log("attempting download of links");
      console.log(this.props.selected.file_links);
      var data = Papa.parse(
        "https://cors-anywhere.herokuapp.com/" + this.props.selected.file_links,
        {
          header: true,
          download: true,
          complete: results => {
            console.log(results.data);
            this.setState({ parseData: results.data });
          }
        }
      );
    }
  }

  startClassifying = () => {
    this.props.loadingActions.setLoading(true);
    var file = this.props.selected.file_names;
    this.props.mlActions.startML(file);
    this.props.nextStep();
  };
  render() {
    console.log(this.state.parseData);
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
          <ul className="player-card-container">
            {this.state.parseData &&
              this.state.parseData.map((item, i) => (
                <li className="data-list-item" key={i}>
                  {Object.keys(item).map(function(key) {
                    return (
                      <div>
                        {key} : {item[key]}
                      </div>
                    );
                  })}
                </li>
              ))}
          </ul>
          <div className="bottom-part">
            <button className="button-style" onClick={this.props.previousStep}>
              Back
            </button>
            <button
              className="button-style"
              onClick={() => this.startClassifying()}
            >
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
    loadingActions: bindActionCreators(loadingActions, dispatch),
    mlActions: bindActionCreators(mlActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PreviewData)
);
