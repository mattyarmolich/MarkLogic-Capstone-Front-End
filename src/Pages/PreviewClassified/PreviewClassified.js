import React, { Component } from "react";
import "./PreviewClassified.scss";
import axios from "axios";
import Papa from "papaparse";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import * as mlActions from "../../utils/actions/mlActions";
import ec2URL from "../../utils/urlAssets";
import * as loadingActions from "../../utils/actions/loadingAction";
import { Switch, Route, withRouter } from "react-router-dom";

class PreviewClassified extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parsedData: null,
      canAdvance: false
    };
  }

  componentDidMount() {}

  componentWillReceiveProps() {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    if (this.props.selected) {
      // var data = Papa.parse("https://cors-anywhere.herokuapp.com/" + ec2URL + "/ml/past_classified_json", {
      //   header: true,
      //   download: true,
      //   complete: results => {
      //     console.log(results);
      //     this.setState({ parseData: results.data, canAdvance: true });
      //   }
      // });

      console.log(this.props);
      axios({
        url: ec2URL + "/ml/past_classified_json",
        method: "POST",
        headers: headers,
        data: {
          file_name: this.props.selected.classified_names
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.setState({
            parseData: JSON.parse(res.data.data)
          });
        })
        .catch(err => {
          console.log(err);
        });
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
              Classification Preview:
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
  )(PreviewClassified)
);
