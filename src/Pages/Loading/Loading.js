import React, { Component } from "react";
import "./Loading.scss";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import * as loadingActions from "../../utils/actions/loadingAction";
import { Switch, Route, withRouter } from "react-router-dom";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon1: false,
      icon2: false,
      icon3: false,
      doneLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive) {
      this.timeoutId = setTimeout(
        function() {
          this.setState({ icon1: true });
          this.timeout2 = setTimeout(
            function() {
              this.setState({ icon2: true });
              this.timeout3 = setTimeout(
                function() {
                  this.setState({ icon3: true, doneLoading: true });
                }.bind(this),
                1000
              );
            }.bind(this),
            1000
          );
        }.bind(this),
        1000
      );
    } else {
      this.setState({
        icon1: false,
        icon2: false,
        icon3: false
      });
    }
  }

  render() {
    return (
      <div className="loading-container">
        <div className="loading-view">
          <div className="Title-text">Loading</div>
          <div>
            <div className={this.state.icon1 ? "active-show" : "inactive"}>
              Loading Data
            </div>
            <div className={this.state.icon2 ? "active-show" : "inactive"}>
              Formatting Data
            </div>
            <div className={this.state.icon3 ? "active-show" : "inactive"}>
              Classifying Data
            </div>
          </div>
          <div className="bottom-part">
            <button className="button-style" onClick={this.props.previousStep}>
              previous
            </button>
            {!this.props.loading ? (
              <button className="button-style" onClick={this.props.nextStep}>
                next
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading)
);
