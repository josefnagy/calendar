import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showEdit } from "../actions/index";
import EventForm from "./EventForm.jsx";

const EventEdit = ({ match, showEdit }) => {
  useEffect(() => {
    showEdit(match.params.eventId);
  }, [showEdit]);

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div>
      EventEditt
      <EventForm
        onSubmit={onSubmit}
        id={match.params.id}
        eventId={match.params.eventId}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {};
};

export default connect(mapStateToProps, { showEdit })(EventEdit);
