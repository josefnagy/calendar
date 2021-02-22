import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../apis/firebase.js";

import Arrows from "./Arrows.jsx";

const Header = ({ date }) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [hidden, setHidden] = useState("");
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      const str = window.location.pathname.split("/");
      const dayId = str[2] ? str[2].split("-") : 0;
      setDay(dayId[2]);
      setMonth(dayId[1]);
      setYear(dayId[0]);
    } else {
      setDay(undefined);
    }

    if (window.location.pathname === "/signup") setHidden("");
    else setHidden("");
  });

  return (
    <header className={`header ${hidden}`}>
      <Link
        to={`/month/${date.calYear}/${date.calMonth}`}
        className="header__date"
      >{`${day ? day + "." : ""} ${
        month
          ? date.monthsNames[month - 1]
          : date.monthsNames[date.calMonth - 1]
      } ${year ? year : date.calYear}`}</Link>
      <div className="header__links">
        {isSignedIn ? (
          <Link
            to={`/stats/${date.calYear}/${date.calMonth}`}
            className="header__link"
          >
            show Stats
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="header__arrows">
        <Arrows />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.date,
    day: state.events.selectedDay.day,
    month: state.events.selectedDay.month,
    year: state.events.selectedDay.year,
  };
};

export default connect(mapStateToProps)(Header);
