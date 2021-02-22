import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showEdit, editEvent, updateStats } from "../actions/index";
import EventForm from "./EventForm.jsx";
import { calcEventStats, deleteEventStats } from "../js/calcEventStats";

const EventEdit = ({
  match,
  eventToEdit,
  editEvent,
  updateStats,
  state,
  userId,
}) => {
  useEffect(() => {
    // showEdit(match.params.eventId);
  }, [showEdit]);

  const onSubmit = (updatedValues, formValues) => {
    const newStats = deleteEventStats(eventToEdit.key, state);
    const updatedSt = calcEventStats(formValues, newStats, userId);
    editEvent(match.params.eventId, updatedValues, match.params.id);

    updateStats({ ...updatedSt }, userId);
  };

  return (
    <div>
      EventEditt
      <EventForm
        onSubmit={onSubmit}
        id={match.params.id}
        eventId={match.params.eventId}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  // console.log(ownProps);
  return {
    eventToEdit: state.events.allEvents[ownProps.match.params.eventId],
    stats: state.stats,
    userId: state.auth.user.uid,
    state,
  };
};

export default connect(mapStateToProps, { showEdit, editEvent, updateStats })(
  EventEdit
);
