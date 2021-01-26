import React, { useState } from "react";
import Calendar from "./components/Calendar.jsx";
import Arrows from "./components/Arrows.jsx";

// import InputBox from "./components/InputBox.jsx";

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

const App = () => {
  console.log("App rendered");
  const [day, setDay] = useState(currDay);
  const [month, setMonth] = useState(currMonth);
  const [year, setYear] = useState(currYear);
  const currentDate = [currYear, currMonth, currDay];

  return (
    <div className="app-container">
      <aside className="aside"></aside>
      <header className="header">
        <div className="header__date">{`${monthsName[month - 1]} ${year}`}</div>
        {/* <InputBox /> */}
        <div className="header__arrows">
          <Arrows
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
            currMonth={currMonth}
            currYear={currYear}
          />
        </div>
      </header>
      <main className="main">
        <Calendar month={month} year={year} today={currentDate} />
      </main>
    </div>
  );
};
export default App;
