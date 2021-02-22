import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { deleteEvent, updateStats } from "../actions";
import { deleteEventStats } from "../js/calcEventStats";

const DeletePortal = ({
  isOpen,
  children,
  id,
  eventId,
  deleteEvent,
  updateStats,
}) => {
  const state = useSelector((state) => state);
  const userId = useSelector((state) => state.auth.user.uid);

  const handleDelete = () => {
    const newStats = deleteEventStats(eventId, state);
    deleteEvent(eventId);
    console.log(newStats);

    updateStats({ ...newStats }, userId);
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="deleteModal">
      <h3>Delete Event</h3>
      {children}
      <div className="deleteModal__buttons">
        <Link to={`/day/${id}`} className="btn__back">
          No
        </Link>
        <Link to={`/day/${id}`} className="btn__delete" onClick={handleDelete}>
          Yes
        </Link>
      </div>
    </div>,
    document.body
  );
};

export default connect(null, { deleteEvent, updateStats })(DeletePortal);
