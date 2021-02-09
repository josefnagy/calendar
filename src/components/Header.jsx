import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Arrows from "./Arrows.jsx";

const Header = ({ date, month, year }) => {
  const [day, setDay] = useState();
  const [hidden, setHidden] = useState("");

  useEffect(() => {
    if (window.location.pathname !== "/") {
      const str = window.location.pathname.split("/");
      const dayId = str[2] ? str[2].split("-") : 0;
      setDay(dayId[2]);
    } else {
      setDay(undefined);
    }

    if (window.location.pathname === "/signup") setHidden("hidden");
    else setHidden("");
  });

  return (
    <header className={`header ${hidden}`}>
      <div className="header__date">{`${day ? day + "." : ""} ${
        month
          ? date.monthsNames[month - 1]
          : date.monthsNames[date.calMonth - 1]
      } ${year ? year : date.calYear}`}</div>

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
