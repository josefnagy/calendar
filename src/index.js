import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import "./js/vendor/grained";

import App from "./App.jsx";
import "./sass/main.scss";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// eslint-disable-next-line no-undef
grained("#root", {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.02,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
