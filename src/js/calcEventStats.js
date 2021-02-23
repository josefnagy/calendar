import _ from "lodash";

import { nextMonthDate, whatADay, getWorkingDaysInMonth } from "./cal";

export const deleteEventStats = (eventId, state) => {
  const wholeState = state;
  const ev = wholeState.events.allEvents[eventId];
  const [event, nextDay] = createEvent(ev);
  const stat = wholeState.stats;
  const stats = { ...stat };
  const today = whatADay(event.year, event.month, event.day);
  const [nextYear, nextMonth] = nextMonthDate(event.year, event.month);
  const nextMonthDateId = `${nextYear}-${nextMonth}`;

  stats[event.dateId].extras.afternoonShiftBonus -= event.afternoonBonus;
  stats[event.dateId].extras.holidayShiftBonus -= event.holidayBonus;
  stats[event.dateId].extras.nightShiftBonus -= event.nightBonus;
  stats[event.dateId].extras.weekendShiftBonus -= event.weekendBonus;

  switch (event.workingHoursType) {
    case "work":
      stats[event.dateId].shifts.workingEvents--;
      if (
        event.function === "Strojvedoucí" &&
        (event.location === "Uhelná služba" || event.location === "Zárubecký")
      ) {
        if (today.last && event.type === "nocni") {
          stats[event.dateId].shifts.workedHoursIn7 -= 5.5;

          stats[nextMonthDateId].shifts.workedHoursIn7 -= 5.5;
          stats[nextMonthDateId].extras.nightShiftBonus -= 5.5;
          stats[nextMonthDateId].extras.weekendShiftBonus -=
            nextDay.weekendBonus;
          stats[nextMonthDateId].extras.holidayShiftBonus -=
            nextDay.holidayBonus;
        } else {
          stats[event.dateId].shifts.workedHoursIn7 -= Number(
            event.workingHours
          );
        }
      } else {
        if (today.last && event.type === "nocni") {
          stats[event.dateId].shifts.workedHoursIn6 -= 5.5;

          stats[nextMonthDateId].shifts.workedHoursIn6 -= 5.5;
          stats[nextMonthDateId].extras.nightShiftBonus -= 5.5;
          stats[nextMonthDateId].extras.weekendShiftBonus -=
            nextDay.weekendBonus;
          stats[nextMonthDateId].extras.holidayShiftBonus -=
            nextDay.holidayBonus;
        } else {
          stats[event.dateId].shifts.workedHoursIn6 -= Number(
            event.workingHours
          );
        }
      }
      break;

    case "holidayAverage":
      stats[event.dateId].shifts.paymentIntoAverage -= Number(
        event.workingHours
      );
      break;

    case "vacation":
      stats.vacation[event.year].usedVacation -= Number(event.workingHours);
      stats[event.dateId].shifts.vacation -= Number(event.workingHours);
      break;

    case "obstacleInWork":
      stats[event.dateId].shifts.obstacleInWork -= Number(event.workingHours);
      break;

    case "sickLeaveAverage":
      stats[event.dateId].shifts.sickLeave -= Number(event.workingHours);
      break;

    case "nv":
      stats[event.dateId].shifts.nv -= Number(event.workingHours);
      break;

    default:
      break;
  }
  return stats;
};

export const calcEventStats = (ev, stats) => {
  //its a new event so just add to stats
  const [event, nextDay] = createEvent(ev);
  const today = whatADay(event.year, event.month, event.day);
  const [nextYear, nextMonth] = nextMonthDate(event.year, event.month);
  const nextMonthDateId = `${nextYear}-${nextMonth}`;

  const newStats = { ...stats };

  const lastDayNightShift = () => {
    return today.last && event.type === "nocni";
  };

  const is7Tarif = () => {
    return (
      event.function === "Strojvedoucí" &&
      (event.location === "Uhelná služba" || event.location === "Zárubecký")
    );
  };

  // check if its first stat in month, if yes then initialize new stats for selected month
  if (!(event.dateId in stats)) {
    newStats[event.dateId] = createDefaultStats(event);
  }
  console.log(stats);
  if (!("vacation" in stats)) {
    newStats.vacation = {};
    newStats.vacation[event.year] = { totalVacation: 188, usedVacation: 0 };
  }
  if (!(nextMonthDateId in stats) && lastDayNightShift()) {
    newStats[nextMonthDateId] = createDefaultStats(event);
  }

  newStats[event.dateId].extras.afternoonShiftBonus += event.afternoonBonus;
  newStats[event.dateId].extras.nightShiftBonus += event.nightBonus;
  newStats[event.dateId].extras.weekendShiftBonus += event.weekendBonus;
  newStats[event.dateId].extras.holidayShiftBonus += event.holidayBonus;

  switch (event.workingHoursType) {
    case "work":
      newStats[event.dateId].shifts.workingEvents++;
      if (is7Tarif()) {
        //check if its last day in month
        if (lastDayNightShift()) {
          newStats[event.dateId].shifts.workedHoursIn7 += 5.5;
          newStats[nextMonthDateId].shifts.workedHoursIn7 += 5.5;
          newStats[nextMonthDateId].extras.nightShiftBonus +=
            nextDay.nightBonus;
          newStats[nextMonthDateId].extras.weekendShiftBonus +=
            nextDay.weekendBonus;
          newStats[nextMonthDateId].extras.holidayShiftBonus +=
            nextDay.holidayBonus;
        } else
          newStats[event.dateId].shifts.workedHoursIn7 += Number(
            event.workingHours
          );
      } else {
        //check if its last day in month
        if (lastDayNightShift()) {
          newStats[event.dateId].shifts.workedHoursIn6 += 5.5;
          newStats[nextMonthDateId].shifts.workedHoursIn6 += 5.5;
          newStats[nextMonthDateId].extras.nightShiftBonus +=
            nextDay.nightBonus;
          newStats[nextMonthDateId].extras.weekendShiftBonus +=
            nextDay.weekendBonus;
          newStats[nextMonthDateId].extras.holidayShiftBonus +=
            nextDay.holidayBonus;
        } else
          newStats[event.dateId].shifts.workedHoursIn6 += Number(
            event.workingHours
          );
      }
      break;

    case "holidayAverage":
      newStats[event.dateId].shifts.paymentIntoAverage += Number(
        event.workingHours
      );
      break;

    case "vacation":
      newStats.vacation[event.year].usedVacation += Number(event.workingHours);
      newStats[event.dateId].shifts.vacation += Number(event.workingHours);
      break;

    case "obstacleInWork":
      newStats[event.dateId].shifts.obstacleInWork += Number(
        event.workingHours
      );
      break;

    case "sickLeaveAverage":
      newStats[event.dateId].shifts.sickLeaveDays += 1;
      newStats[event.dateId].shifts.sickLeave += Number(event.workingHours);
      break;

    case "nv":
      newStats[event.dateId].shifts.nv += Number(event.workingHours);
      break;

    default:
      break;
  }

  return newStats;
};

const createEvent = (event) => {
  const { year, month, day, workingHours } = event;
  event.holidayBonus = 0;
  event.weekendBonus = 0;
  event.afternoonBonus = 0;
  event.nightBonus = 0;
  const nextDay = {
    weekendBonus: 0,
    holidayBonus: 0,
    nightBonus: 0,
  };

  const currDayInfo = whatADay(year, month, day);
  // console.log(currDayInfo);
  const nextDayInfo = whatADay(year, month, day, "next");
  // console.log(nextDayInfo);

  switch (event.type) {
    case "ranni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      break;

    case "denni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      event.afternoonBonus = 3.5;
      break;

    case "odpoledni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      event.afternoonBonus = workingHours;
      break;

    case "nocni":
      if (currDayInfo.day === 4) event.weekendBonus += 5.5;
      if (currDayInfo.day === 5) event.weekendBonus = workingHours;
      if (currDayInfo.day === 6) event.weekendBonus += 5.5;

      if (currDayInfo.holiday) event.weekendBonus += 5.5;
      if (nextDayInfo.holiday) event.weekendBonus += 5.5;

      event.weekendBonus = event.weekendBonus > 11 ? 11 : event.weekendBonus;

      if (currDayInfo.holiday) event.holidayBonus += 5.5;
      if (nextDayInfo.holiday) event.holidayBonus += 5.5;

      event.afternoonBonus = 3.5;
      event.nightBonus = 7.5;

      break;

    default:
      break;
  }

  if (currDayInfo.last && event.type === "nocni") {
    if (currDayInfo.day === 4) {
      event.weekendBonus = 0;
      nextDay.weekendBonus = 5.5;
    }
    if (currDayInfo.day === 5) {
      event.weekendBonus = 5.5;
      nextDay.weekendBonus = 5.5;
    }
    if (currDayInfo.day === 6) {
      event.weekendBonus = 5.5;
    }

    if (currDayInfo.holiday) event.weekendBonus = 5.5;
    if (nextDayInfo.holiday) nextDay.weekendBonus = 5.5;

    if (currDayInfo.holiday) event.holidayBonus = 5.5;
    if (nextDayInfo.holiday) nextDay.holidayBonus = 5.5;
    event.nightBonus = 2;
    nextDay.nightBonus = 5.5;
  }

  return [event, nextDay];
};

const createDefaultStats = (event) => {
  const defStats = {
    shifts: {
      workingEvents: 0,
      workingDays: getWorkingDaysInMonth(event.year, event.month),
      workingHoursPerDay: 7.5,
      workedHoursIn6: 0,
      workedHoursIn7: 0,
      paymentIntoAverage: 0,
      obstacleInWork: 0,
      sickLeave: 0,
      vacation: 0,
      sickLeaveDays: 0,
      nv: 0,
      get workingHoursForMonth() {
        return this.workingDays * this.workingHoursPerDay;
      },
    },
    extras: {
      weekendShiftBonus: 0,
      nightShiftBonus: 0,
      afternoonShiftBonus: 0,
      holidayShiftBonus: 0,
    },
  };
  return defStats;
};
