import React, { Component } from "react";
import "./Home.scss";
import Uploads from "../UploadsPage/Uploads";
import Header from "../../Components/Header/Header";
import StepWizard from "react-step-wizard";
import ResultPage from "../ResultPage/ResultPage";
import ExportPage from "../ExportPage/ExportPage";
import Loading from "../Loading/Loading";
import PreviewData from "../PreviewData/PreviewData";
class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      currentStep: 0,
      type: 1
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
  render() {
    return (
      <div className="home-container">
        <Header />
        {this.state.type === 1 ? this.passSpecific() : <div>Null</div>}
        <div className="footer">
          <div>
            Privacy policy
            <a href="google.com">Privacy Policy</a>
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
