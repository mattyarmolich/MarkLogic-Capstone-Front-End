import React, { Component } from 'react';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);

  }
  logout = () => {
    sessionStorage.removeItem('token');
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
            <NavLink className="navigation-link" to="/link3">
              Link1
            </NavLink>
            <NavLink className="navigation-link" to="/link2">
              Link2
            </NavLink>
            <NavLink className="navigation-link" to="/link1">
              Link3
            </NavLink>
            {sessionStorage.getItem('centerId') === 5709 ? (
              <NavLink className="navigation-link" to="/edit-deploy">
                Edit/Deploy
              </NavLink>
            ) : (
              <div />
            )}
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
