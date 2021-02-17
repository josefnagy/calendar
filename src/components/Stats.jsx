import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import StatsCard from "./StatsCard.jsx";
import {
  getDaysInMonth,
  nextMonthDate,
  prevMonthDate,
  whatADay,
} from "../js/cal";

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
  let workedHoursIn6 = 0;
  let workedHoursIn7 = 0;
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

  let weekendShiftBonus = 0;
  let nightShiftBonus = 0;
  let afternoonShiftBonus = 0;
  let holidayShiftBonus = 0;

  // TODO musim jeste osetrit kdyz budu mit nocni posledniho v mesici :-]

  for (let x = 0; x < events.length; x++) {
    if (prevYear === events[x].year && prevMonth === events[x].month) {
      const isLastDayEvent = whatADay(prevYear, prevMonth, events[x].day);
      const firstDayEvent = whatADay(
        prevYear,
        prevMonth,
        events[x].day,
        "next"
      );
      nightShiftBonus += 5.5;
      if (firstDayEvent.day > 4) weekendShiftBonus += 5.5;
      if (firstDayEvent.holiday) holidayShiftBonus += 5.5;

      if (isLastDayEvent.last && events[x].type === "nocni") {
        if (
          events[x].function === "Strojvedoucí" &&
          (events[x].location === "Uhelná služba" ||
            events[x].location === "Zárubecký")
        )
          workedHoursIn7 += 5.5;
        else workedHoursIn6 += 5.5;
      }
    }
    // check if its selected month
    if (events[x].month !== month || events[x].year !== year) continue;
    else {
      const today = whatADay(events[x].year, events[x].month, events[x].day);

      afternoonShiftBonus += events[x].afternoonBonus;

      nightShiftBonus += events[x].nightBonus;

      weekendShiftBonus += events[x].weekendBonus;
      holidayShiftBonus += events[x].holidayBonus;

      switch (events[x].workingHoursType) {
        case "work":
          workingEventsForMonth++;
          if (
            events[x].function === "Strojvedoucí" &&
            (events[x].location === "Uhelná služba" ||
              events[x].location === "Zárubecký")
          ) {
            if (today.last && events[x].type === "nocni") workedHoursIn7 += 5.5;
            else workedHoursIn7 += Number(events[x].workingHours);
          } else {
            if (today.last && events[x].type === "nocni") workedHoursIn6 += 5.5;
            else workedHoursIn6 += Number(events[x].workingHours);
          }
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

      if (today.last && events[x].type === "nocni") {
        console.log("nocni v posledni den mesici");
      }
    }
  }

  const workingHoursForMonth = workingDays * workingHoursPerDay;
  const totalWorkedHours =
    workedHoursIn6 + workedHoursIn7 + paymentInHolidayAverage;
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
      label: "Hodinová mzda v 6",
      value: workedHoursIn6,
    },
    {
      label: "Hodinová mzda v 7",
      value: workedHoursIn7,
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
