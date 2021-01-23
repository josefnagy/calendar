import React from "react";
import { prevMonthDate, nextMonthDate } from "../js/cal";

const Arrows = ({ month, year, setMonth, setYear, currMonth, currYear }) => {
  const onPrevButtonClick = (year, month) => {
    const [prevYear, prevMonth] = prevMonthDate(year, month);
    setYear(prevYear);
    setMonth(prevMonth);
  };

  const onNextButtonClick = (year, month) => {
    const [nextYear, nextMonth] = nextMonthDate(year, month);
    setYear(nextYear);
    setMonth(nextMonth);
  };

  const onTodayButtonClick = (year, month) => {
    // console.log(year, month);
    setYear(year);
    setMonth(month);
  };

  return (
    <>
      <button onClick={() => onPrevButtonClick(year, month)}>left</button>
      <button onClick={() => onTodayButtonClick(currYear, currMonth)}>
        Today
      </button>
      <button onClick={() => onNextButtonClick(year, month)}>right</button>
    </>
  );
};

export default Arrows;
