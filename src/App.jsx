import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";

// import Dropdown from "./components/Dropdown.jsx";
// import InputBox from "./components/InputBox.jsx";

import history from "./history";

const monthsName = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
];

const options = [
  {
    name: "Strojvedoucí",
    value: "str",
  },
  {
    name: "Staniční dozorce",
    value: "stD",
  },
  {
    name: "Vedoucí posunu",
    value: "vp",
  },
];

const App = () => {
  return (
    <div className="app-container">
      <Router history={history}>
        <>
          <Aside />
          <Header />
          <main className="main">
            {/* <div className="center">
          <Dropdown options={options} />
        </div> */}

            <Calendar />
          </main>
        </>
      </Router>
    </div>
  );
};
export default App;
