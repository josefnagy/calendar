import React from "react";
import { useSelector } from "react-redux";
import StatsCard from "./StatsCard.jsx";

const Stats = () => {
  const calendar = useSelector((state) => state.date.calendar);
  const events = Object.values(useSelector((state) => state.events.allEvents));
  const month = Number(useSelector((state) => state.date.calMonth));
  const year = Number(useSelector((state) => state.date.calYear));

  let workingDays = 0;
  const workingHoursPerDay = 7.5;
  let workingEventsForMonth = 0;
  let workedHours = 0;
  let paymentInHolidayAverage = 0;
  let obstacleInWork = 0;
  let sickLeave = 0;
  let sickLeaveDays = 0;
  let nv = 0;

  for (let i = 0; i < calendar.length; i++) {
    // check if its current month
    if (calendar[i].month !== month && calendar[i].year !== year) continue;
    // count how many working days in month
    else if (calendar[i].dayInWeek < 5) workingDays += 1;
  }

  for (let x = 0; x < events.length; x++) {
    if (events[x].month !== month || events[x].year !== year) continue;
    else {
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

  return (
    <div className="stats">
      <StatsCard title="Směny" stats={shifts} />
      <StatsCard title="Příplatky" stats={shifts} />
      <StatsCard title="Mzda" stats={shifts} />
      <StatsCard title="Ostatní" stats={shifts} />
    </div>
  );
};

export default Stats;
