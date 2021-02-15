import { holidays, daysInWeek } from "./calConfig.js";

let calendar = [];

const getEaster = (year) => {
  const f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  return [month, day];
};

const getEasterHolidays = (year, easterSunday) => {
  const easterSundayDate = new Date(year, easterSunday[0] - 1, easterSunday[1]);
  easterSundayDate.setDate(easterSundayDate.getDate() - 2);
  let easterFridayAndMonday = [
    easterSundayDate.getMonth(),
    easterSundayDate.getDate(),
  ];
  easterSundayDate.setDate(easterSundayDate.getDate() + 3);

  easterFridayAndMonday.push(easterSundayDate.getMonth());
  easterFridayAndMonday.push(easterSundayDate.getDate());

  return easterFridayAndMonday;
};

export const prevMonthDate = (yearStr, monthStr) => {
  let prevMonth = null;
  let prevMonthsYear = null;

  const year = Number(yearStr);
  const month = Number(monthStr);

  if (month === 1) {
    prevMonth = 12;
    prevMonthsYear = year - 1;
  } else {
    prevMonth = month - 1;
    prevMonthsYear = year;
  }

  const daysInPrevMonth = getDaysInMonth(prevMonthsYear, prevMonth);

  return [prevMonthsYear, prevMonth, daysInPrevMonth];
};

export const nextMonthDate = (yearStr, monthStr) => {
  let nextMonth = null;
  let nextMonthsYear = null;

  const year = Number(yearStr);
  const month = Number(monthStr);

  if (month === 12) {
    nextMonth = 1;
    nextMonthsYear = year + 1;
  } else {
    nextMonth = month + 1;
    nextMonthsYear = year;
  }

  const daysInNextMonth = getDaysInMonth(nextMonthsYear, nextMonth);

  return [nextMonthsYear, nextMonth, daysInNextMonth];
};

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 0);
  return date.getDate();
};

const updateHolidays = (year) => {
  const easterSunday = getEaster(year);
  const easterHolidays = getEasterHolidays(year, easterSunday);

  holidays.push({
    day: easterHolidays[1],
    month: easterHolidays[0] + 1,
    name: "Velký pátek",
  });
  holidays.push({
    day: easterHolidays[3],
    month: easterHolidays[2] + 1,
    name: "Velikonoční pondělí",
  });
};

// ------------------ main function -----------------------------

const createCalendar = (setYear, setMonth) => {
  calendar = [];

  let year = Number(setYear);
  let month = Number(setMonth);

  if (holidays.length === 11) {
    updateHolidays(year);
  } else if (holidays.length === 13) {
    // remove easter friday and monday from different year
    holidays.pop();
    holidays.pop();
    updateHolidays(year);
  }

  const daysInMonth = getDaysInMonth(year, month);

  const [prevMonthsYear, prevMonth, daysInPrevMonth] = prevMonthDate(
    year,
    month
  );
  const [nextMonthsYear, nextMonth, daysInNextMonth] = nextMonthDate(
    year,
    month
  );

  //zjistit co je konrektne za den 1. v mesici
  // 0 = je pondeli a 6 je nedele
  const firstDayInMonth = new Date(year, month - 1, 0).getDay();

  //zjistit kolik zobrazit dni z predesleho mesice
  // --- po delsi uvaze je to jasne... proste firstDayInMonth je takove cislo ktere presne rekne kolik dni se musi predtim zobrazit
  const prevMonthDaysToShow = firstDayInMonth;

  //zjistit konkretni datumy od predesleho mesice co se maji zobrazit
  const startCalendarFromDate =
    prevMonthDaysToShow === 0 ? 0 : daysInPrevMonth - prevMonthDaysToShow + 1;

  //zjistit kolik zobrazit dni z nasledujiciho mesice
  const nextMonthDaysToShow = 42 - (firstDayInMonth + daysInMonth);

  if (prevMonthDaysToShow !== 0) {
    for (let i = startCalendarFromDate; i <= daysInPrevMonth; i++) {
      const holiday = holidays.find((holiday) => {
        return holiday.day === i && holiday.month === prevMonth;
      });

      const day = {
        day: i,
        month: prevMonth,
        year: prevMonthsYear,
        when: "prev",
        holiday: holiday ? holiday.name : "",
      };

      calendar.push(day);
    }
  }
  let dayInWeek = firstDayInMonth;

  for (let i = 1; i <= daysInMonth; i++) {
    const holiday = holidays.find((holiday) => {
      return holiday.day === i && holiday.month === month;
    });

    if (dayInWeek > 6) dayInWeek = 0;

    const day = {
      day: i,
      month,
      year,
      dateId: `${year}-${month}-${i}`,
      dayInWeek,
      when: "current",
      holiday: holiday ? holiday.name : "",
    };
    dayInWeek++;
    calendar.push(day);
  }
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    const holiday = holidays.find((holiday) => {
      return holiday.day === i && holiday.month === nextMonth;
    });

    const day = {
      day: i,
      month: nextMonth,
      year: nextMonthsYear,
      when: "next",
      holiday: holiday ? holiday.name : "",
    };

    calendar.push(day);
  }
  // console.log(calendar);
  return calendar;
};

export default createCalendar;
