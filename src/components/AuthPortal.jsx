import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AuthPortal = ({ isOpen, children }) => {
  const handleDelete = () => {
    // deleteEvent(eventId);+
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="authModal">{children}</div>,
    document.body
  );
};

export default connect(null, {})(AuthPortal);
