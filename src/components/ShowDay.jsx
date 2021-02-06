import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { showADay } from "../actions";
import DeletePortal from "./DeletePortal.jsx";

const ShowDay = ({ showADay, match, selectedEvents, load }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (load) {
      showADay(match.params.id);
    }
    if (match.path.slice(-6) === "delete") {
      setOpen(true);
    }
  }, [showADay]);

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

          <Link
            to={{
              pathname: `/day/${event.id}/event/${event.key}/delete/`,
              deleteEvent: true,
            }}
            className="item__delete"
          >
            x
          </Link>
          <DeletePortal
            isOpen={open}
            onClose={() => setOpen(false)}
            id={match.params.id}
            eventId={match.params.eventId}
          >
            Are you sure?
          </DeletePortal>
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
            to={{
              pathname: `/day/${match.params.id}/event/new`,
              dayId: match.params.id,
            }}
            // to={`/day/${match.params.id}/event/new`}
            className="event-list__add-event-btn"
          >
            + Add Event +
          </Link>
        </div>
      </div>
      <div className="showday__img"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);

  if (
    !("events" in state.events.selectedDay) &&
    Object.values(state.events.allEvents).length === 0
  ) {
    // console.log("Refresh byl, loadujem z DB");
    return { selectedEvents: [], load: true };
  } else {
    // console.log("refresh nebyl, neni potreba loadovat z DB");

    if ("events" in state.events.selectedDay) {
      const events = Object.values(state.events.selectedDay.events);
      return { selectedEvents: events, load: false };
    }
  }
};

export default connect(mapStateToProps, { showADay })(ShowDay);
