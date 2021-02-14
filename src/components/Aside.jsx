import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth.jsx";

const Aside = () => {
  return (
    <aside className="aside">
      <Link to="/" className="calendar-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="calendar-link__svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="calendar-link__path"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </Link>
      <Auth />
    </aside>
  );
};

export default Aside;
