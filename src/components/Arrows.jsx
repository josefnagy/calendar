import React from "react";
import { connect } from "react-redux";

import { prevMonthDate, nextMonthDate } from "../js/cal";
import { setDate, fetchEvents } from "../actions";

const Arrows = ({ date, setDate, fetchEvents }) => {
  const month = date.calMonth;
  const year = date.calYear;
  const currMonth = date.currentMonth;
  const currYear = date.currentYear;

  const getCal = (year, month) => {
    setDate({ calYear: year, calMonth: month });
    fetchEvents(year, month);
  };

  const onPrevButtonClick = (year, month) => {
    const [prevYear, prevMonth] = prevMonthDate(year, month);
    getCal(prevYear, prevMonth);
  };

  const onNextButtonClick = (year, month) => {
    const [nextYear, nextMonth] = nextMonthDate(year, month);
    getCal(nextYear, nextMonth);
  };

  const onTodayButtonClick = (year, month) => {
    getCal(year, month);
  };

  return (
    <>
      <button
        className="arrows__button-left"
        onClick={() => onPrevButtonClick(year, month)}
      >
        <svg id="Capa_1" viewBox="0 0 490.667 490.667" xmlSpace="preserve">
          <path
            className="arrow"
            d="M466.219,237.781L231.552,3.115C229.548,1.115,226.831-0.005,224,0H32
	c-5.891-0.011-10.675,4.757-10.686,10.648c-0.005,2.84,1.123,5.565,3.134,7.571l227.136,227.115L24.448,472.448
	c-4.171,4.16-4.179,10.914-0.019,15.085c2.006,2.011,4.731,3.139,7.571,3.134h192c2.831,0.005,5.548-1.115,7.552-3.115
	l234.667-234.667c4.171-4.16,4.179-10.914,0.019-15.085C466.231,237.794,466.225,237.788,466.219,237.781z"
          />
        </svg>
      </button>
      <button
        className="button-today"
        onClick={() => onTodayButtonClick(currYear, currMonth)}
      >
        Today
      </button>
      <button
        className="arrows__button-right"
        onClick={() => onNextButtonClick(year, month)}
      >
        <svg id="Capa_1" viewBox="0 0 490.667 490.667" xmlSpace="preserve">
          <path
            className="arrow"
            d="M466.219,237.781L231.552,3.115C229.548,1.115,226.831-0.005,224,0H32
	c-5.891-0.011-10.675,4.757-10.686,10.648c-0.005,2.84,1.123,5.565,3.134,7.571l227.136,227.115L24.448,472.448
	c-4.171,4.16-4.179,10.914-0.019,15.085c2.006,2.011,4.731,3.139,7.571,3.134h192c2.831,0.005,5.548-1.115,7.552-3.115
	l234.667-234.667c4.171-4.16,4.179-10.914,0.019-15.085C466.231,237.794,466.225,237.788,466.219,237.781z"
          />
        </svg>
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return { date: state.date };
};

export default connect(mapStateToProps, { setDate, fetchEvents })(Arrows);
