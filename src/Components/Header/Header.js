import React, { Component } from "react";
import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log(sessionStorage.getItem("token"));
    axios
      .post(
        "http://ec2-52-33-68-240.us-west-2.compute.amazonaws.com/users/logout",
        "",
        { headers: headers }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    sessionStorage.removeItem("token");
  };

  render() {
    return (
      <div className="header-wrapper">
        <div className="header">
          <div className="navigation">
            <div className="spacer" />
            <NavLink className="navigation-link" to="/Home">
              Home
            </NavLink>
          </div>
          <div className="dropdown-container">
            <div className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                <Link to="/">Details</Link>
                <Link onClick={() => this.logout()} to="/">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="line" />
      </div>
    );
  }
}

export default Header;
