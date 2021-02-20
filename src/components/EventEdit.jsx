import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showEdit, editEvent } from "../actions/index";
import EventForm from "./EventForm.jsx";

const EventEdit = ({ match, eventToEdit, editEvent }) => {
  useEffect(() => {
    // showEdit(match.params.eventId);
  }, [showEdit]);

  const onSubmit = (updatedValues) => {
    editEvent(match.params.eventId, updatedValues, match.params.id);
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
  console.log(state.events.allEvents[ownProps.match.params.eventId]);
  return { eventToEdit: state.events.allEvents[ownProps.match.params.eventId] };
};

export default connect(mapStateToProps, { showEdit, editEvent })(EventEdit);
