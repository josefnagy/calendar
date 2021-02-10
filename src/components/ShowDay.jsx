import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { showADay } from "../actions";
import DeletePortal from "./DeletePortal.jsx";

const ShowDay = ({
  showADay,
  match,
  selectedEvents,
  load,
  isSignedIn,
  userId,
}) => {
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
    if (event.userId === userId) {
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
    } else return "";
  });
  const renderEvents = () => {
    if (isSignedIn) {
      if (selectedEvents.length > 0) {
        return renderEventList;
      } else {
        return "Sorry bro, you have to ADD some events first";
      }
    } else {
      return "Sorry bro, you have to login to view events / add events";
    }
  };

  return (
    <div className="showday">
      <div className="showday__event-list">
        {renderEvents()}
        {isSignedIn ? (
          <div className="event-list__btn-container">
            <Link
              to={{
                pathname: `/day/${match.params.id}/event/new`,
                dayId: match.params.id,
              }}
              className="event-list__add-event-btn"
            >
              + Add Event +
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="showday__img"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.auth.isSignedIn) {
    if (
      !("events" in state.events.selectedDay) &&
      Object.values(state.events.allEvents).length === 0
    ) {
      // console.log("Refresh byl, loadujem z DB");
      return {
        selectedEvents: [],
        load: true,
        userId: state.auth.isSignedIn ? state.auth.user.uid : null,
      };
    } else {
      // console.log("refresh nebyl, neni potreba loadovat z DB");

      if ("events" in state.events.selectedDay) {
        const events = Object.values(state.events.selectedDay.events);
        return {
          selectedEvents: events,
          load: false,
          isSignedIn: state.auth.isSignedIn,
          userId: state.auth.isSignedIn ? state.auth.user.uid : null,
        };
      }
    }
  } else {
    return {
      load: false,
      isSignedIn: state.auth.isSignedIn,
      selectedEvents: [],
    };
  }
};

export default connect(mapStateToProps, { showADay })(ShowDay);
