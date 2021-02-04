import React from "react";
import { connect } from "react-redux";

import EventForm from "./EventForm.jsx";
import { newEvent } from "../actions/index";

const EventAdd = ({ newEvent, match }) => {
  const onSubmit = (formValues) => {
    newEvent(formValues);
  };

  return (
    <div className="add-event">
      <EventForm onSubmit={onSubmit} id={match.params.id} />
    </div>
  );
};

export default connect(null, { newEvent })(EventAdd);
