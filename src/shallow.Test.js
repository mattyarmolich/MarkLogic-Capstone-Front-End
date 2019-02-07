import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
it("renders without crashing", () => {
  shallow(<App store={store} />);
});
