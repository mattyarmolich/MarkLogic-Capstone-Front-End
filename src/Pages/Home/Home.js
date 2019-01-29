import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import Uploads from '../UploadsPage/Uploads';
import Header from '../../Components/Header/Header';
import StepZilla from "react-stepzilla";
import ResultPage from '../ResultPage/ResultPage';

const steps =
  [
    {name: 'Upload Files', component: <Uploads />},
    {name: 'Result', component: <ResultPage />},
  ]

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
  submitFiles = (e) => {
    var formData = new FormData();
    console.log(this.fileInput.current.files[0]);
    var csvFile = this.fileInput.current.files[0];
    if(csvFile != null) {
      formData.append("File", csvFile);
      axios.post('upload_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
    }
  }


  render() {
    return (
      <div className="home-container">
        <Header/>
        <div className='step-progress'>
          <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
        </div>
      </div>

    )
  }
}

export default Home;
