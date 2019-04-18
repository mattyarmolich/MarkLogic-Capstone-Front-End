import React, { Component } from "react";
import "./CreateAccount.scss";
import Home from "../Home/Home";
import { Link } from "react-router-dom";
import axios from "axios";

//redux imports
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../utils/actions/authActions";

import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
    this.props.authActions.registerAuth(this.state.email, this.state.password);
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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => this.onChange(e)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => this.onChange(e)}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.onSubmit()}
        >
          Register
        </Button>

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
