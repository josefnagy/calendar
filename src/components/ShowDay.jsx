import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showADay } from "../actions";

const ShowDay = ({ showADay, match, events }) => {
  useEffect(() => {
    showADay(match.params.id);
  }, [showADay]);

  console.log(events);
  const renderEventList = events.map((event) => {
    return (
      <li key={event.label} className="event-list__item">
        <span className="item__label">{event.label}</span>
        <span className="item__buttons">X +</span>
        <span className="item__location">{event.label}</span>
        <span className="item__notes">{event.label}</span>
      </li>
    );
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
