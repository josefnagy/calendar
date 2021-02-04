import React from "react";
import { connect } from "react-redux";

import EventForm from "./EventForm.jsx";
import { newEvent } from "../actions/index";

const EventAdd = ({ newEvent }) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className="add-event">
      <EventForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { newEvent })(EventAdd);
