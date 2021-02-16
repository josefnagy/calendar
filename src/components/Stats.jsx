import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import StatsCard from "./StatsCard.jsx";
import { getDaysInMonth, nextMonthDate, prevMonthDate } from "../js/cal";

const Stats = () => {
  const calendar = useSelector((state) => state.date.calendar);
  const events = Object.values(useSelector((state) => state.events.allEvents));
  const month = Number(useSelector((state) => state.date.calMonth));
  const year = Number(useSelector((state) => state.date.calYear));
  const [prevYear, prevMonth] = prevMonthDate(year, month);
  const [nextYear, nextMonth] = nextMonthDate(year, month);
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  const daysInNextMonth = getDaysInMonth(nextYear, nextMonth);

  const getDay = (year, month, day) => {
    // const date = new Date(year, month, day);
    const date = new Date(year, month - 1, day);
    let whatDay = date.getDay();
    whatDay === 0 ? 6 : whatDay--;
    return whatDay;
  };

  let workingDays = 0;
  const workingHoursPerDay = 7.5;
  let workingEventsForMonth = 0;
  let workedHours = 0;
  let paymentInHolidayAverage = 0;
  let obstacleInWork = 0;
  let sickLeave = 0;
  let sickLeaveDays = 0;
  let nv = 0;

  console.log(events);

  for (let i = 0; i < calendar.length; i++) {
    // check if its current month
    if (calendar[i].month !== month && calendar[i].year !== year) continue;
    // count how many working days in month
    else if (calendar[i].dayInWeek < 5) workingDays += 1;
  }

  const calWithKeys = _.mapKeys(calendar, "dateId");
  let weekendShiftBonus = 0;
  let nightShiftBonus = 0;
  let afternoonShiftBonus = 0;
  let holidayShiftBonus = 0;

  // TODO musim jeste osetrit kdyz budu mit nocni posledniho v mesici :-]

  for (let x = 0; x < events.length; x++) {
    if (
      events[x].month === prevMonth &&
      events[x].year === prevYear &&
      events[x].day === daysInPrevMonth &&
      events[x].type === "nocni"
    ) {
      workedHours += 5.5;
      nightShiftBonus += 5.5;
      const lastDayInMonth = getDay(prevYear, prevMonth, daysInPrevMonth);
      lastDayInMonth === 4 || lastDayInMonth === 5
        ? (weekendShiftBonus += 5.5)
        : null;
    }
    // check if its selected month
    if (events[x].month !== month || events[x].year !== year) continue;
    else {
      if (events[x].type === "odpoledni") afternoonShiftBonus += 7.5;
      if (events[x].type === "denni") afternoonShiftBonus += 3.5;

      if (calWithKeys[events[x].id].dayInWeek === 5)
        weekendShiftBonus += Number(events[x].workingHours);

      if (events[x].type === "nocni") {
        nightShiftBonus += 7.5;
        afternoonShiftBonus += 3.5;
      }

      if (
        calWithKeys[events[x].id].dayInWeek === 4 &&
        events[x].type === "nocni"
      )
        weekendShiftBonus += Number(events[x].workingHours / 2);

      if (
        calWithKeys[events[x].id].dayInWeek === 6 &&
        events[x].type === "nocni"
      )
        weekendShiftBonus += Number(events[x].workingHours / 2);

      if (
        calWithKeys[events[x].id].dayInWeek === 6 &&
        events[x].type !== "nocni"
      )
        weekendShiftBonus += Number(events[x].workingHours);

      if (calWithKeys[events[x].id].holiday !== "") {
        // if (calWithKeys[events[x].id].dayInWeek > 4)
        weekendShiftBonus += Number(events[x].workingHours);
        holidayShiftBonus += Number(events[x].workingHours);
      }

      switch (events[x].workingHoursType) {
        case "work":
          workingEventsForMonth++;
          workedHours += Number(events[x].workingHours);
          break;

        case "holidayAverage":
          paymentInHolidayAverage += Number(events[x].workingHours);
          break;

        case "obstacleInWork":
          obstacleInWork += Number(events[x].workingHours);
          break;

        case "sickLeaveAverage":
          sickLeaveDays += 1;
          sickLeave += Number(events[x].workingHours);
          break;

        case "nv":
          nv += Number(events[x].workingHours);
          break;

        default:
          break;
      }
    }
  }

  const workingHoursForMonth = workingDays * workingHoursPerDay;
  const totalWorkedHours = workedHours + paymentInHolidayAverage;
  const overtime =
    workingHoursForMonth < totalWorkedHours
      ? totalWorkedHours - workingHoursForMonth
      : 0;

  const shifts = [
    {
      label: "Fond Pracovní doby",
      value: workingHoursForMonth,
    },
    {
      label: "Počet směn",
      value: workingEventsForMonth,
    },
    {
      label: "Odpracovaných hodin",
      value: workedHours,
    },
    {
      label: "Platba Průměrem",
      value: paymentInHolidayAverage,
    },
    {
      label: "Překážka v práci",
      value: obstacleInWork,
    },
    {
      label: "Nemocenská",
      value: sickLeaveDays,
    },
    {
      label: "Náhradní volno",
      value: nv,
    },
    {
      label: "Přesčasů",
      value: overtime,
    },
  ];

  const extras = [
    {
      label: "Sobota / Neděle",
      value: weekendShiftBonus,
    },
    {
      label: "noční (25 Kč)",
      value: nightShiftBonus,
    },
    {
      label: "Odpolední (3 Kč)",
      value: afternoonShiftBonus,
    },
    {
      label: "Svátek",
      value: holidayShiftBonus,
    },
  ];

  return (
    <div className="stats">
      <StatsCard title="Směny" stats={shifts} />
      <StatsCard title="Příplatky" stats={extras} />
      <StatsCard title="Mzda" stats={shifts} />
      <StatsCard title="Ostatní" stats={shifts} />
    </div>
  );
};

export default Stats;
