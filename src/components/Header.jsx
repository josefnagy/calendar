import React from "react";
import { connect } from "react-redux";

import Arrows from "./Arrows.jsx";

const Header = ({ date }) => {
  return (
    <header className="header">
      <div className="header__date">{`${date.monthsNames[date.calMonth - 1]} ${
        date.calYear
      }`}</div>

      {/* <InputBox /> */}
      <div className="header__arrows">
        <Arrows />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return { date: state.date };
};

export default connect(mapStateToProps)(Header);
