import React, { Component } from "react";
import "./Home.scss";
import Uploads from "../UploadsPage/Uploads";
import Header from "../../Components/Header/Header";
import StepWizard from "react-step-wizard";
import ResultPage from "../ResultPage/ResultPage";
import ExportPage from "../ExportPage/ExportPage";
import Loading from "../Loading/Loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      currentStep: 0
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("token") === null) {
      this.props.history.push("/");
    }
  }

  updateCounter = () => {
    console.log(this.props.currentStep);
    this.setState({
      currentStep: this.props.currentStep
    });
  };

  render() {
    return (
      <div className="home-container">
        <Header />
        <StepWizard nav="" onStepChange={() => this.updateCounter()}>
          <Uploads />
          <Loading />
          <ResultPage />
          <ExportPage />
        </StepWizard>
        <div>{this.state.currentStep}</div>
      </div>
    );
  }
}

export default Home;
