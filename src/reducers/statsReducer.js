import _ from "lodash";

import { DELETE_STATS, UPDATE_STATS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      console.log(action.payload);
      return {
        ...action.payload,
      };
    case DELETE_STATS:
      console.log(action.payload);
      return {
        ...action.payload,
      };

    // case NEW_EVENT: {
    //   console.log(action.payload);
    //   const event = action.payload;
    //   const today = whatADay(event.year, event.month, event.day);
    //   const newStats = { ...state };

    //   if (typeof newStats[event.dateId] === "undefined") {
    //     newStats[event.dateId] = {
    //       shifts: {
    //         workingEvents: 0,
    //         workingDays: getWorkingDaysInMonth(event.year, event.month),
    //         workingHoursPerDay: 7.5,
    //         workedHoursIn6: 0,
    //         workedHoursIn7: 0,
    //         paymentInHolidayAverage: 0,
    //         obstacleInWork: 0,
    //         sickLeave: 0,
    //         sickLeaveDays: 0,
    //         nv: 0,
    //         get workingHoursForMonth() {
    //           return this.workingDays * this.workingHoursPerDay;
    //         },
    //       },
    //       extras: {
    //         weekendShiftBonus: 0,
    //         nightShiftBonus: 0,
    //         afternoonShiftBonus: 0,
    //         holidayShiftBonus: 0,
    //       },
    //     };
    //   }

    //   newStats[event.dateId].extras.afternoonShiftBonus += event.afternoonBonus;
    //   newStats[event.dateId].extras.nightShiftBonus += event.nightBonus;
    //   newStats[event.dateId].extras.weekendShiftBonus += event.weekendBonus;
    //   newStats[event.dateId].extras.holidayShiftBonus += event.holidayBonus;

    //   switch (event.workingHoursType) {
    //     case "work":
    //       newStats[event.dateId].shifts.workingEvents++;
    //       if (
    //         event.function === "Strojvedoucí" &&
    //         (event.location === "Uhelná služba" ||
    //           event.location === "Zárubecký")
    //       ) {
    //         if (today.last && event.type === "nocni")
    //           newStats[event.dateId].shifts.workedHoursIn7 += 5.5;
    //         else
    //           newStats[event.dateId].shifts.workedHoursIn7 += Number(
    //             event.workingHours
    //           );
    //       } else {
    //         if (today.last && event.type === "nocni")
    //           newStats[event.dateId].shifts.workedHoursIn6 += 5.5;
    //         else
    //           newStats[event.dateId].shifts.workedHoursIn6 += Number(
    //             event.workingHours
    //           );
    //       }
    //       break;

    //     case "holidayAverage":
    //       newStats[event.dateId].shifts.paymentInHolidayAverage += Number(
    //         event.workingHours
    //       );
    //       break;

    //     case "obstacleInWork":
    //       newStats[event.dateId].shifts.obstacleInWork += Number(
    //         event.workingHours
    //       );
    //       break;

    //     case "sickLeaveAverage":
    //       newStats[event.dateId].shifts.sickLeaveDays += 1;
    //       newStats[event.dateId].shifts.sickLeave += Number(event.workingHours);
    //       break;

    //     case "nv":
    //       newStats[event.dateId].shifts.nv += Number(event.workingHours);
    //       break;

    //     default:
    //       break;
    //   }

    //   console.log(newStats);

    //   return {
    //     ...state,
    //     ...newStats,
    //   };
    // }
    default:
      return state;
  }
};
