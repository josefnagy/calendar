import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showADay } from "../actions";

const ShowDay = ({ showADay, match, events }) => {
  useEffect(() => {
    showADay(match.params.id);
  }, [showADay]);

  const renderEventList = events.map((event) => {
    return <li key={event.label}>{event.label}</li>;
  });

  return (
    <div className="showday">
      <div className="showday__event-list">{renderEventList}</div>
      <div className="showday__img">qq</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { events: state.selectedDay };
};

export default connect(mapStateToProps, { showADay })(ShowDay);
