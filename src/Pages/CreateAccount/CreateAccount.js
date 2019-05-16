import React, { Component } from "react";
import "./CreateAccount.scss";
import Home from "../Home/Home";
import { Link } from "react-router-dom";
import axios from "axios";

//redux imports
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../utils/actions/authActions";

import { withRouter } from "react-router-dom";
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.authenticated) {
      this.props.history.push("/Home");
    } else {
      alert("An Error Occurred While Creating Your Account");
    }
  }

  submitCreds = e => {
    if (/\S+@\S+\.\S+/.test(this.state.email)) {
      this.props.authActions.registerAuth(
        this.state.email,
        this.state.password
      );
    } else {
      alert("Invalid email address");
      return;
    }
  };

  setEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <div className="create-account-container">
        <input
          placeholder="email"
          className="login"
          onChange={e => this.setEmail(e)}
        />
        <input
          type="password"
          placeholder="password"
          className="login"
          onChange={e => this.setPassword(e)}
        />

        <button onClick={e => this.submitCreds(e)} className="register">
          Register
        </button>

        <div className="footer">
          Already have an Account?
          <Link to="/">Login</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.credentials
  };
}

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateAccount)
);
