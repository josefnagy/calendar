import React from "react";
import Calendar from "./components/Calendar.jsx";

import createCalendar from "./js/cal";

const getTodaysDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const calendar = createCalendar(year, month);
  console.log(calendar);

  return `${day}. ${month}. ${year}`;
};

const App = () => {
  return (
    <div className="app-container">
      <aside className="aside">aside</aside>
      <header className="header">{getTodaysDate()}</header>
      <main className="main">
        <Calendar />
      </main>
    </div>
  );
};
export default App;
