import _ from "lodash";

import {
  nextMonthDate,
  prevMonthDate,
  whatADay,
  getWorkingDaysInMonth,
} from "./cal";

export const deleteEventStats = (eventId, state) => {
  const wholeState = state;
  const ev = wholeState.events.allEvents[eventId];
  const event = createEvent(ev);
  const stat = wholeState.stats;
  const stats = { ...stat };

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
        stats[event.dateId].shifts.workedHoursIn7 -= Number(event.workingHours);
      } else {
        stats[event.dateId].shifts.workedHoursIn6 -= Number(event.workingHours);
      }
      break;

    case "holidayAverage":
      stats[event.dateId].shifts.paymentInHolidayAverage -= Number(
        event.workingHours
      );
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

export const calcEventStats = (ev, stats, userId, oldEvent = {}) => {
  // console.log(ev);
  // console.log(stats);
  // console.log(userId);

  if (_.isEmpty(oldEvent)) {
    //its a new event so just add to stats
    const event = createEvent(ev);
    const today = whatADay(event.year, event.month, event.day);

    const newStats = { ...stats };

    if (!(event.dateId in stats)) {
      newStats[event.dateId] = {
        shifts: {
          workingEvents: 0,
          workingDays: getWorkingDaysInMonth(event.year, event.month),
          workingHoursPerDay: 7.5,
          workedHoursIn6: 0,
          workedHoursIn7: 0,
          paymentInHolidayAverage: 0,
          obstacleInWork: 0,
          sickLeave: 0,
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
    }

    newStats[event.dateId].extras.afternoonShiftBonus += event.afternoonBonus;
    newStats[event.dateId].extras.nightShiftBonus += event.nightBonus;
    newStats[event.dateId].extras.weekendShiftBonus += event.weekendBonus;
    newStats[event.dateId].extras.holidayShiftBonus += event.holidayBonus;

    switch (event.workingHoursType) {
      case "work":
        newStats[event.dateId].shifts.workingEvents++;
        if (
          event.function === "Strojvedoucí" &&
          (event.location === "Uhelná služba" || event.location === "Zárubecký")
        ) {
          if (today.last && event.type === "nocni")
            newStats[event.dateId].shifts.workedHoursIn7 += 5.5;
          else
            newStats[event.dateId].shifts.workedHoursIn7 += Number(
              event.workingHours
            );
        } else {
          if (today.last && event.type === "nocni")
            newStats[event.dateId].shifts.workedHoursIn6 += 5.5;
          else
            newStats[event.dateId].shifts.workedHoursIn6 += Number(
              event.workingHours
            );
        }
        break;

      case "holidayAverage":
        newStats[event.dateId].shifts.paymentInHolidayAverage += Number(
          event.workingHours
        );
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
  } else {
    //its not empty, so you have to update stats instead of add
  }
};

const createEvent = (event) => {
  const { year, month, day, workingHours } = event;
  event.holidayBonus = 0;
  event.weekendBonus = 0;
  event.afternoonBonus = 0;
  event.nightBonus = 0;

  const currDayInfo = whatADay(year, month, day);
  // console.log(currDayInfo);
  const prevDayInfo = whatADay(year, month, day, "prev");
  // console.log(prevDayInfo);
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
    if (currDayInfo.day === 4) event.weekendBonus = 0;
    if (currDayInfo.day === 5) event.weekendBonus = 5.5;
    if (currDayInfo.day === 6) event.weekendBonus = 5.5;

    if (currDayInfo.holiday) event.weekendBonus = 5.5;

    if (currDayInfo.holiday) event.holidayBonus = 5.5;
    event.nightBonus = 2;
  }

  return event;
};
