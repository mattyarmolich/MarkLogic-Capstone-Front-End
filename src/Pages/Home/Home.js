import React, { Component } from "react";
import "./Home.scss";
import Uploads from "../UploadsPage/Uploads";
import Header from "../../Components/Header/Header";
import StepWizard from "react-step-wizard";
import ResultPage from "../ResultPage/ResultPage";
import ExportPage from "../ExportPage/ExportPage";
import Loading from "../Loading/Loading";
import PreviewData from "../PreviewData/PreviewData";
import PreviewClassified from "../PreviewClassified/PreviewClassified";
import PastQueries from "../PastQueriesPage/PastQueries";

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      currentStep: 0,
      type: 0
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("token") === null) {
      this.props.history.push("/");
    }
  }

  updateCounter = () => {
    this.setState({
      currentStep: this.props.currentStep
    });
  };

  setType = input => {
    this.setState({
      type: input
    });
  };
  passSpecific() {
    return (
      <StepWizard nav="" onStepChange={() => this.updateCounter()}>
        <Uploads />
        <PreviewData />
        <Loading />
        <ResultPage />
        <ExportPage />
      </StepWizard>
    );
  }

  pastQueries() {
    return (
      <StepWizard nav="" onStepChange={() => this.updateCounter()}>
        <PastQueries />
        <PreviewClassified />
      </StepWizard>
    );
  }

  returnState = input => {
    this.setState({
      type: input
    });
  };
  render() {
    return (
      <div className="home-container">
        <Header changeState={e => this.returnState(e)} />
        {this.state.type === 0 ? (
          <div className="pick-container">
            <div className="header-text">
              Pick What Type of Operation you'd like to do
            </div>
            <div className="path-selection">
              <button className="type-button" onClick={e => this.setType(1)}>
                Upload New
              </button>
              <button className="type-button" onClick={e => this.setType(2)}>
                See Past Classifications
              </button>
            </div>
          </div>
        ) : (
          <React.Fragment />
        )}

        {this.state.type === 1 ? this.passSpecific() : <React.Fragment />}
        {this.state.type === 2 ? this.pastQueries() : <React.Fragment />}
        <div className="footer">
          <div>
            Privacy policy
            <a href="https://geraldomacias.github.io/MarkLogic/privacy_policy.html">
              Privacy Policy
            </a>
          </div>
          <div>
            Found an issue? log here
            <a href="https://teammark.feedbear.com/">Link</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
