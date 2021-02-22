import React from "react";
import { connect } from "react-redux";

import EventForm from "./EventForm.jsx";
import { newEvent, updateStats } from "../actions/index";
import { events } from "../js/januaryEvents";
import { calcEventStats } from "../js/calcEventStats";

const EventAdd = ({ newEvent, match, userId, updateStats, stats }) => {
  const onFillDb = () => {
    let newStats = {};
    events.forEach((event) => {
      const userId = "qJ8kMeeqFVN2rPk6zPsRXydlSXn1";
      newStats = calcEventStats(event, newStats, userId);
      newEvent({ ...event, userId });
      updateStats({ ...newStats }, userId);
    });
  };

  const onSubmit = (formValues) => {
    const newStats = calcEventStats(formValues, stats, userId);
    newEvent({ ...formValues, userId });
    updateStats({ ...newStats }, userId);
  };

  return (
    <div className="add-event">
      <button onClick={onFillDb}>fillDB</button>
      <EventForm onSubmit={onSubmit} id={match.params.id} />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { userId: state.auth.user.uid, stats: state.stats };
};

export default connect(mapStateToProps, { newEvent, updateStats })(EventAdd);
