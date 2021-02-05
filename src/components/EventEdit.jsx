import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showEdit, editEvent } from "../actions/index";
import EventForm from "./EventForm.jsx";

const EventEdit = ({ match, showEdit, editEvent }) => {
  useEffect(() => {
    showEdit(match.params.eventId);
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
        edit={true}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {};
};

export default connect(mapStateToProps, { showEdit, editEvent })(EventEdit);
