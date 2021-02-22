import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../apis/firebase";
import AuthPortal from "./AuthPortal.jsx";
import { login, logout, setUser } from "../actions";

const Auth = ({ isSignedIn, logout, setUser, userEmail }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else if (isSignedIn) logout();
    });
    return unsubscribe;
  }, []);

  const handleAuth = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setOpen(!open);
    logout();
  };

  const renderAuthList = () => {
    if (!isSignedIn) {
      return (
        <>
          <li className="auth__item">
            <Link
              to="/auth/login"
              onClick={() => setOpen(!open)}
              className="auth__link"
            >
              Přihlásit se
            </Link>
          </li>
          <li className="auth__item">
            <Link
              to="/auth/signup"
              onClick={() => setOpen(!open)}
              className="auth__link"
            >
              Vytvořit účet
            </Link>
          </li>
        </>
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
      <AuthPortal
        isOpen={open}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
      >
        <h3>{userEmail ? userEmail : "Vítej soudruhu"}</h3>
        <ul ref={ref}>{renderAuthList()}</ul>
      </AuthPortal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userEmail: state.auth.isSignedIn ? state.auth.user.email : "",
  };
};

export default connect(mapStateToProps, { login, logout, setUser })(Auth);
