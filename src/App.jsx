import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";
import ShowDay from "./components/ShowDay.jsx";

import history from "./history";

const App = () => {
  return (
    <div className="app-container">
      <Router history={history}>
        <>
          <Aside />
          <Header />
          <main className="main">
            <Route path="/" exact component={Calendar} />
            <Route path="/day/:id" component={ShowDay} />
          </main>
        </>
      </Router>
    </div>
  );
};

export default App;
