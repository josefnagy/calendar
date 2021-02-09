import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../apis/firebase";
import AuthPortal from "./AuthPortal.jsx";
import { login, logout, setUser } from "../actions";

const Auth = ({ isSignedIn, logout, login, setUser }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else logout();
    });
    return unsubscribe;
  }, []);

  const handleAuth = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
  };

  const renderAuthList = () => {
    if (!isSignedIn) {
      return (
        <li>
          <Link to="/login">login</Link>
          <button className="auth__logout-btn" onClick={handleLogout}>
            Odhlásit se
          </button>
        </li>
      );
    } else {
      return (
        <li>
          <button className="auth__logout-btn" onClick={handleLogout}>
            Odhlásit se
          </button>
        </li>
      );
    }
  };

  return (
    <>
      <span className="user" onClick={() => handleAuth()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="user__icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <AuthPortal isOpen={open} onClose={() => setOpen(false)}>
        <h3>Hello boy</h3>
        <ul>{renderAuthList()}</ul>
      </AuthPortal>
    </>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { login, logout, setUser })(Auth);
