import React from "react";
import CSVTable from "./Components/CSV Visualize/csv_table.js";

const csvHeaders = ["header 1", "header 2", "header 3"];
const csvData = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Rathath IT", "Abdennour TM", "xxxxxxx"],
  ["Sinopec", "xxxxx", "xxxxxxx"],
  ["Auto1", "Petter", "Germany"],
  ["Estifeda", "Yousri K", "xxxxxx"],
  ["Nine 10ᵗʰ", "Amjed Idris", "xxxxxx"],
  ["Tamkeen", "Mohamed Alshibi", "xxxxxxx"],
  ["Packet Publishing", "David Become", "UK"],
  ["Software hourse", "Soro", "Poland"]
];

class CSVTEST extends React.Component {
  state = {};
  getFileName() {
    if (!this.state.filename) return undefined;
    if (!this.state.filename.endsWith(".csv"))
      return this.state.filename + ".csv";
    return this.state.filename;
  }
  render() {
    return (
      <div>
        <div>
          <h3>"title of file.csv"</h3>
        </div>
        <div>
          <CSVTable headers={csvHeaders} data={csvData} />
        </div>
      </div>
    );
  }
}

export default CSVTEST;
