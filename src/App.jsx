import React from "react";
import { useSelector } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import Calendar from "./components/Calendar.jsx";
import ShowDay from "./components/ShowDay.jsx";
import EventAdd from "./components/EventAdd.jsx";
import EventEdit from "./components/EventEdit.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Stats from "./components/Stats.jsx";
import GuardedRoute from "./components/GuardedRoute.jsx";

import history from "./history";

const App = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  return (
    <div className="app-container">
      <Router history={history}>
        <Aside />
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact component={Calendar} />
            <Route path="/month/:year/:month" exact component={Calendar} />
            <Route path="/day/:id" exact component={ShowDay} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={Signup} />
            <GuardedRoute
              path="/day/:id/event/:eventId/edit"
              exact
              component={EventEdit}
              auth={isSignedIn}
            />
            <GuardedRoute
              path="/day/:id/event/:eventId/delete"
              exact
              component={ShowDay}
              auth={isSignedIn}
            />
            <GuardedRoute
              path="/stats/:year/:month"
              exact
              component={Stats}
              auth={isSignedIn}
            />
            <Route path="/day/:id/event/new" exact component={EventAdd} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
