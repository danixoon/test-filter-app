import * as React from "react";
import { Provider, connect } from "react-redux";
import { store } from "./redux/store";
import RootContainer from "./containers/RootContainer";

import "./sass/default.scss";

export type RootContainerProps = {};

const Root: React.FC<RootContainerProps> = (props) => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

export default Root;
