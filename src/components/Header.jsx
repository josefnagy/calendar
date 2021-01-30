import React from "react";

import Arrows from "./Arrows.jsx";

const Header = ({
  monthsName,
  month,
  year,
  setMonth,
  setYear,
  currMonth,
  currYear,
}) => {
  return (
    <header className="header">
      <div className="header__date">{`${monthsName[month - 1]} ${year}`}</div>

      {/* <InputBox /> */}
      <div className="header__arrows">
        <Arrows
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
          currMonth={currMonth}
          currYear={currYear}
        />
      </div>
    </header>
  );
};

export default Header;
