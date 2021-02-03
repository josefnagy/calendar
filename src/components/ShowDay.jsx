import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showADay } from "../actions";

const ShowDay = ({ date, showADay, match, events }) => {
  useEffect(() => {
    showADay(match.params.id);
  }, []);

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
  console.log(state);
  return { date: state.date, events: state.events };
};

export default connect(mapStateToProps, { showADay })(ShowDay);
