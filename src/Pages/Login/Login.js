import React, { Component } from "react";
import "./Login.scss";
import Home from "../Home/Home";
import logo from "./M.svg";
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

//React router imports
import { Link } from "react-router-dom";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

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

  // render() {
  //   return (
  //     <div className="login-container">
  //       <img className="logo" src={logo} />

  //       <input
  //         id="email"
  //         placeholder="Email"
  //         className="login"
  //         onChange={e => this.onChange(e)}
  //       />
  //       <input
  //         type="password"
  //         id="password"
  //         placeholder="Password"
  //         className="login"
  //         onChange={e => this.onChange(e)}
  //       />

  //       <button to="/Home" className="submit" onClick={() => this.onSubmit()}>
  //         <div className="login-text">Submit</div>
  //       </button>

  //       <div className="footer">
  //         {"Dont have an account? "}
  //         <Link to="/CreateAccount">Sign Up</Link>
  //       </div>
  //       <div className="footer">
  //         {"Forgot your password? "}
  //         <Link to="/ResetPassword">Link</Link>
  //       </div>
  //     </div>
  //   );
  // }
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

function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <img className="logo" src={logo} />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h6">
          MarkLogic Classifier
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => this.onSubmit()}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  withStyles(styles)(SignIn),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
