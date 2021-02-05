import React from "react";
import { connect } from "react-redux";

import Arrows from "./Arrows.jsx";

const Header = ({ date, day, year, month }) => {
  return (
    <header className="header">
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
