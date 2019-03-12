import React, { Component } from "react";
import "./ResultPage.scss";
import axios from "axios";
import "./sampledata";

const x = [
  {
    id: 1,
    first_name: "Sloan",
    last_name: "Danielot",
    email: "sdanielot0@cdbaby.com",
    gender: "Male",
    ip_address: "112.35.219.33"
  },
  {
    id: 2,
    first_name: "Axel",
    last_name: "Grendon",
    email: "agrendon1@springer.com",
    gender: "Male",
    ip_address: "85.162.167.138"
  },
  {
    id: 3,
    first_name: "Connie",
    last_name: "Hatrick",
    email: "chatrick2@vistaprint.com",
    gender: "Male",
    ip_address: "33.199.79.56"
  },
  {
    id: 4,
    first_name: "Gloriana",
    last_name: "Bachelar",
    email: "gbachelar3@toplist.cz",
    gender: "Female",
    ip_address: "118.89.72.254"
  },
  {
    id: 5,
    first_name: "Konrad",
    last_name: "Schettini",
    email: "kschettini4@wired.com",
    gender: "Male",
    ip_address: "195.188.99.154"
  },
  {
    id: 6,
    first_name: "Nickolai",
    last_name: "Putman",
    email: "nputman5@uol.com.br",
    gender: "Male",
    ip_address: "182.138.253.31"
  },
  {
    id: 7,
    first_name: "Padraig",
    last_name: "Hegg",
    email: "phegg6@illinois.edu",
    gender: "Male",
    ip_address: "189.95.7.31"
  },
  {
    id: 8,
    first_name: "Tami",
    last_name: "Campe",
    email: "tcampe7@de.vu",
    gender: "Female",
    ip_address: "184.92.33.53"
  },
  {
    id: 9,
    first_name: "Justinian",
    last_name: "Renvoys",
    email: "jrenvoys8@hc360.com",
    gender: "Male",
    ip_address: "206.120.162.62"
  },
  {
    id: 10,
    first_name: "Greer",
    last_name: "Leming",
    email: "gleming9@ow.ly",
    gender: "Female",
    ip_address: "113.200.238.182"
  },
  {
    id: 11,
    first_name: "Julieta",
    last_name: "Medhurst",
    email: "jmedhursta@quantcast.com",
    gender: "Female",
    ip_address: "203.176.228.165"
  },
  {
    id: 12,
    first_name: "Leo",
    last_name: "Rakes",
    email: "lrakesb@creativecommons.org",
    gender: "Male",
    ip_address: "5.188.90.98"
  },
  {
    id: 13,
    first_name: "Felicity",
    last_name: "Clere",
    email: "fclerec@surveymonkey.com",
    gender: "Female",
    ip_address: "194.163.65.255"
  },
  {
    id: 14,
    first_name: "Mady",
    last_name: "Cloke",
    email: "mcloked@elegantthemes.com",
    gender: "Female",
    ip_address: "6.246.183.158"
  },
  {
    id: 15,
    first_name: "Gabriela",
    last_name: "Rickert",
    email: "grickerte@rakuten.co.jp",
    gender: "Female",
    ip_address: "15.208.190.203"
  },
  {
    id: 16,
    first_name: "Falkner",
    last_name: "Senner",
    email: "fsennerf@pcworld.com",
    gender: "Male",
    ip_address: "104.156.58.48"
  },
  {
    id: 17,
    first_name: "Gibby",
    last_name: "Whitley",
    email: "gwhitleyg@dailymail.co.uk",
    gender: "Male",
    ip_address: "191.112.66.154"
  },
  {
    id: 18,
    first_name: "Lulu",
    last_name: "Beviss",
    email: "lbevissh@addtoany.com",
    gender: "Female",
    ip_address: "8.169.160.223"
  },
  {
    id: 19,
    first_name: "Meg",
    last_name: "Wallace",
    email: "mwallacei@hubpages.com",
    gender: "Female",
    ip_address: "143.190.0.131"
  },
  {
    id: 20,
    first_name: "Ignatius",
    last_name: "Bordone",
    email: "ibordonej@oracle.com",
    gender: "Male",
    ip_address: "170.38.62.82"
  },
  {
    id: 21,
    first_name: "Sheelagh",
    last_name: "MacKill",
    email: "smackillk@amazon.de",
    gender: "Female",
    ip_address: "21.119.127.45"
  },
  {
    id: 22,
    first_name: "Amelita",
    last_name: "Keywood",
    email: "akeywoodl@bbb.org",
    gender: "Female",
    ip_address: "95.70.19.208"
  },
  {
    id: 23,
    first_name: "Moishe",
    last_name: "Yakebowitch",
    email: "myakebowitchm@timesonline.co.uk",
    gender: "Male",
    ip_address: "220.132.194.81"
  },
  {
    id: 24,
    first_name: "Ephrem",
    last_name: "Sterman",
    email: "estermann@vk.com",
    gender: "Male",
    ip_address: "62.134.66.254"
  },
  {
    id: 25,
    first_name: "Leland",
    last_name: "Labrenz",
    email: "llabrenzo@apple.com",
    gender: "Male",
    ip_address: "48.189.116.53"
  },
  {
    id: 26,
    first_name: "Samuele",
    last_name: "Meffan",
    email: "smeffanp@ox.ac.uk",
    gender: "Male",
    ip_address: "179.78.138.78"
  },
  {
    id: 27,
    first_name: "Marcelia",
    last_name: "Cars",
    email: "mcarsq@scientificamerican.com",
    gender: "Female",
    ip_address: "156.18.219.205"
  },
  {
    id: 28,
    first_name: "Jorey",
    last_name: "Pirolini",
    email: "jpirolinir@is.gd",
    gender: "Female",
    ip_address: "230.239.132.63"
  },
  {
    id: 29,
    first_name: "Brnaba",
    last_name: "Water",
    email: "bwaters@cisco.com",
    gender: "Male",
    ip_address: "229.91.7.173"
  },
  {
    id: 30,
    first_name: "Adamo",
    last_name: "Roscher",
    email: "aroschert@desdev.cn",
    gender: "Male",
    ip_address: "129.114.229.161"
  },
  {
    id: 31,
    first_name: "Denna",
    last_name: "Torn",
    email: "dtornu@senate.gov",
    gender: "Female",
    ip_address: "228.221.111.184"
  },
  {
    id: 32,
    first_name: "Sybyl",
    last_name: "Rochell",
    email: "srochellv@nationalgeographic.com",
    gender: "Female",
    ip_address: "76.232.137.29"
  },
  {
    id: 33,
    first_name: "Vin",
    last_name: "Timperley",
    email: "vtimperleyw@nydailynews.com",
    gender: "Male",
    ip_address: "97.121.13.156"
  },
  {
    id: 34,
    first_name: "Gus",
    last_name: "Yoselevitch",
    email: "gyoselevitchx@edublogs.org",
    gender: "Female",
    ip_address: "197.159.81.244"
  },
  {
    id: 35,
    first_name: "Claudian",
    last_name: "Bambrick",
    email: "cbambricky@de.vu",
    gender: "Male",
    ip_address: "131.137.63.127"
  },
  {
    id: 36,
    first_name: "Addy",
    last_name: "Dottridge",
    email: "adottridgez@si.edu",
    gender: "Male",
    ip_address: "255.220.210.84"
  },
  {
    id: 37,
    first_name: "Carney",
    last_name: "Reuben",
    email: "creuben10@cbsnews.com",
    gender: "Male",
    ip_address: "41.244.15.198"
  },
  {
    id: 38,
    first_name: "Concordia",
    last_name: "Heinel",
    email: "cheinel11@gizmodo.com",
    gender: "Female",
    ip_address: "233.135.131.239"
  },
  {
    id: 39,
    first_name: "Yolanthe",
    last_name: "Alenshev",
    email: "yalenshev12@weibo.com",
    gender: "Female",
    ip_address: "90.135.222.61"
  },
  {
    id: 40,
    first_name: "Adel",
    last_name: "Morling",
    email: "amorling13@e-recht24.de",
    gender: "Female",
    ip_address: "181.176.176.4"
  }
];
class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _downloadTxtFile = object => {
    const fileData = JSON.stringify(object);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "tempFile.json";
    link.href = url;
    link.click();
  };

  render() {
    return (
      <div className="result-container">
        <div className="results-view">
          <div className="Title-text">Results</div>
          <ul className="player-card-container">
            {x.map((object, key) => (
              <li key={key} className="player-card-object">
                {Object.keys(object).map(function(key) {
                  return (
                    <div>
                      <div>
                        {key} : {object[key]}
                      </div>
                    </div>
                  );
                })}
                <button onClick={() => this._downloadTxtFile(object)}>
                  Download
                </button>
              </li>
            ))}
          </ul>
          <div className="bottom-part">
            <button onClick={this.props.previousStep}>previous</button>
            <button onClick={this.props.nextStep}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;
