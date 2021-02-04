import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showADay } from "../actions";
import { Link } from "react-router-dom";

const ShowDay = ({ showADay, match, selectedEvents, load }) => {
  useEffect(() => {
    if (load) {
      showADay(match.params.id);
    }
  }, [showADay]);

  // console.log(events);
  const renderEventList = selectedEvents.map((event) => {
    return (
      <li key={event.key} className="event-list__item">
        <span className="item__label">{event.label}</span>
        <span className="item__buttons">
          <Link
            to={`/day/${event.id}/event/${event.key}/edit/`}
            className="item__edit"
          >
            e
          </Link>
          <Link to="" className="item__delete">
            x
          </Link>
        </span>
        <span className="item__location">{event.location}</span>
        <span className="item__notes">{event.notes}</span>
      </li>
    );
  });

  return (
    <div className="showday">
      <div className="showday__event-list">
        {selectedEvents.length > 0
          ? renderEventList
          : "Sorry bro, no events today.... Try add some"}
        <div className="event-list__btn-container">
          <Link
            to={`/day/${match.params.id}/event/new`}
            className="event-list__add-event-btn"
          >
            + Add Event +
          </Link>
        </div>
      </div>
      <div className="showday__img">qq</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (state.selectedDay.length === 0) {
    const selectedEvnts = state.events.filter((event) => {
      return event.id === ownProps.match.params.id;
    });
    if (state.events.length > 0) {
      return { selectedEvents: selectedEvnts, load: false };
    } else {
      return { selectedEvents: selectedEvnts, load: true };
    }
  }
  return { selectedEvents: state.selectedDay, load: true };
};

export default connect(mapStateToProps, { showADay })(ShowDay);
