import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteEvent, deleteStats } from "../actions";

const DeletePortal = ({
  isOpen,
  children,
  id,
  eventId,
  deleteEvent,
  deleteStats,
}) => {
  const handleDelete = () => {
    deleteEvent(eventId);
    deleteStats(eventId);
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

export default connect(null, { deleteEvent, deleteStats })(DeletePortal);
