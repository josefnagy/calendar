import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";

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
          </main>
        </>
      </Router>
    </div>
  );
};

export default App;
