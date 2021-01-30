import React, { useState } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";

// import Dropdown from "./components/Dropdown.jsx";
// import InputBox from "./components/InputBox.jsx";

import history from "./history";

const date = new Date();
const currDay = date.getDate();
const currMonth = date.getMonth() + 1;
const currYear = date.getFullYear();

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
  console.log("App rendered");
  const [day, setDay] = useState(currDay);
  const [month, setMonth] = useState(currMonth);
  const [year, setYear] = useState(currYear);
  const currentDate = [currYear, currMonth, currDay];

  return (
    <div className="app-container">
      <Router history={history}>
        <>
          <Aside />
          <Header
            monthsName={monthsName}
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
            currMonth={currMonth}
            currYear={currYear}
          />
          <main className="main">
            {/* <div className="center">
          <Dropdown options={options} />
        </div> */}

            <Calendar month={month} year={year} today={currentDate} />
          </main>
        </>
      </Router>
    </div>
  );
};
export default App;
