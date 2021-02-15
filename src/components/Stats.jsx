import React from "react";
import { useSelector } from "react-redux";

const Stats = () => {
  const calendar = useSelector((state) => state.date.calendar);
  const events = Object.values(useSelector((state) => state.events.allEvents));
  const month = Number(useSelector((state) => state.date.calMonth));
  const year = Number(useSelector((state) => state.date.calYear));

  // const countDays = (stored, current) => {
  //   if (current.dayInWeek < 5) return stored + 1;
  //   else return stored;
  // };

  // const workingDays = calendar.reduce(countDays, 0);
  // const workingHoursPerDay = 7.5;
  // const workingHoursForMonth = workingDays * workingHoursPerDay;

  // const eventsForMonth = events.reduce((acc, cur) => {
  //   console.log(`${cur.year} - ${cur.month}`);

  //   if (cur.month === month && cur.year === year) return acc + 1;
  //   else return acc;
  // }, 0);

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
  const overtime =
    workingHoursForMonth < workedHours ? workedHours - workingHoursForMonth : 0;

  return (
    <div className="stats">
      <div className="stats__card">
        <h2 className="stat-card__title">Směny</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Počet směn:</span>
          <span className="stat-value">{workingEventsForMonth}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Odpracovaných hodin:</span>
          <span className="stat-value">{workedHours}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Platba Průměrem:</span>
          <span className="stat-value">{paymentInHolidayAverage}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Překážka v práci:</span>
          <span className="stat-value">{obstacleInWork}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Nemocenská:</span>
          <span className="stat-value">{sickLeaveDays}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Náhradní volno:</span>
          <span className="stat-value">{nv}</span>
        </div>
        <div className="stat">
          <span className="stat-name">Přesčasů:</span>
          <span className="stat-value">{overtime}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Příplatky</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Mzda</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Ostatní</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
