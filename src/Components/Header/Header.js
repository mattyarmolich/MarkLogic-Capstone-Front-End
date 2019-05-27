import React, { Component } from "react";
import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import EC2Link from "../../utils/urlAssets";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios
      .post(EC2Link + "/users/logout", "", { headers: headers })
      .then(function(response) {
        alert(response.data.message);
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
            <div
              className="navigation-link"
              onClick={e => this.props.changeState(0)}
            >
              Back To Home
            </div>
          </div>
          <div className="dropdown-container">
            <div className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                {/* <Link to="/Details">Details</Link> */}
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
