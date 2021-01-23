import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./sass/main.scss";

import "./js/vendor/grained";

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

ReactDOM.render(<App />, document.getElementById("root"));
