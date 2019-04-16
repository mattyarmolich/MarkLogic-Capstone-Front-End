import React, { Component } from "react";
import "./Details.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div className="details-container">Details</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
