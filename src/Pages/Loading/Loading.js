import React, { Component } from "react";
import "./Loading.scss";
import axios from "axios";

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

  componentWillReceiveProps() {
    if (this.props.isActive) {
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
              Classifying Data
            </div>
            <div className={this.state.icon2 ? "active-show" : "inactive"}>
              Slapping Jake
            </div>
            <div className={this.state.icon3 ? "active-show" : "inactive"}>
              Getting Bread
            </div>
          </div>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>previous</button>
            {this.state.doneLoading ? (
              <button onClick={this.props.nextStep}>next</button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
