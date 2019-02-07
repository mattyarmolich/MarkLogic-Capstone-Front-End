import React from "react";
import ReactDOM from "react-dom";
import Uploads from "./pages/UploadsPage/Uploads";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Uploads />, div);
  ReactDOM.unmountComponentAtNode(div);
});
