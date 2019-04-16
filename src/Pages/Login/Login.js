import React, { Component } from "react";
import "./Login.scss";
import Home from "../Home/Home";
import logo from "./M.svg";
//redux imports
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../utils/actions/authActions";
import { Switch, Route, withRouter } from "react-router-dom";

//React router imports
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {}

  onChange = e => {
    if (e.target.id === "email") {
      this.setState({
        email: e.target.value
      });
    }

    if (e.target.id === "password") {
      this.setState({
        password: e.target.value
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.authenticated) {
      this.props.history.push("/Home");
    } else {
      alert("incorrect password");
    }
  }

  onSubmit = () => {
    this.props.authActions.fetchAuth(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className="login-container">
        <img className="logo" src={logo} />

        <input
          id="email"
          placeholder="Email"
          className="login"
          onChange={e => this.onChange(e)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="login"
          onChange={e => this.onChange(e)}
        />

        <button to="/Home" className="submit" onClick={() => this.onSubmit()}>
          <div className="login-text">Submit</div>
        </button>

        <div className="footer">
          {"Dont have an account? "}
          <Link to="/CreateAccount">Sign Up</Link>
        </div>
        <div className="footer">
          {"Forgot your password? "}
          <Link to="/ResetPassword">Link</Link>
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
  )(Login)
);
