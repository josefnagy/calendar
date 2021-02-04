import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showEdit } from "../actions/index";
import EventForm from "./EventForm.jsx";

const EventEdit = ({ match, showEdit }) => {
  useEffect(() => {
    showEdit(match.params.id);
  }, [showEdit]);

  const onSubmit = (formValues) => {};

  return (
    <div>
      EventEditt
      <EventForm onSubmit={onSubmit} id={match.params.id} />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {};
};

export default connect(mapStateToProps, { showEdit })(EventEdit);
