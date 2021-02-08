import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";
import ShowDay from "./components/ShowDay.jsx";
import EventAdd from "./components/EventAdd.jsx";
import EventEdit from "./components/EventEdit.jsx";

import history from "./history";

const App = () => {
  return (
    <div className="app-container">
      <Router history={history}>
        <Aside />
        <Header />
        <main className="main">
          <Route path="/" exact component={Calendar} />
          <Route path="/month/:year/:month" exact component={Calendar} />
          <Route path="/day/:id" exact component={ShowDay} />
          <Route
            path="/day/:id/event/:eventId/edit"
            exact
            component={EventEdit}
          />
          <Route
            path="/day/:id/event/:eventId/delete"
            exact
            component={ShowDay}
          />
          <Route path="/day/:id/event/new" exact component={EventAdd} />
        </main>
      </Router>
    </div>
  );
};

export default App;
