import React, { Component } from 'react';
import './Home.scss';
import Uploads from '../UploadsPage/Uploads';
import Header from '../../Components/Header/Header';
import StepWizard from "react-step-wizard";
import ResultPage from '../ResultPage/ResultPage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    if(sessionStorage.getItem("token") === null) {
      this.props.history.push('/');
    }
  }



  render() {
    return (
      <div className="home-container">
        <Header/>
          <StepWizard>
            <Uploads/>
            <ResultPage/>
          </StepWizard>
      </div>

    )
  }
}

export default Home;
