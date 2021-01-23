const calendar = [];

// const calendar = [
//   {
//     day: 1,
//     month: 21,
//     year: 2021,
//     when: "prev"
//   },
// ];

const daysInWeek = [
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle",
];

export const prevMonthDate = (year, month) => {
  let prevMonth = null;
  let prevMonthsYear = null;

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

export const nextMonthDate = (year, month) => {
  let nextMonth = null;
  let nextMonthsYear = null;

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

const createCalendar = (setYear, setMonth) => {
  let year = 2020;
  let month = 1;

  const daysInMonth = getDaysInMonth(year, month);

  const [prevMonthsYear, prevMonth, daysInPrevMonth] = prevMonthDate(
    year,
    month
  );
  const [nextMonthsYear, nextMonth, daysInNextMonth] = nextMonthDate(
    year,
    month
  );
  console.log(prevMonthsYear + " + " + prevMonth + " " + daysInPrevMonth);
  console.log(nextMonthsYear + " + " + nextMonth + " " + daysInNextMonth);

  console.log("month: ", month);
  console.log("year: ", year);

  //zjistit co je konrektne za den 1. v mesici
  // 0 = je pondeli a 6 je nedele
  const firstDayInMonth = new Date(year, month - 1, 0).getDay();

  console.log("First day in month is ", firstDayInMonth);
  console.log("First day in month is ", daysInWeek[firstDayInMonth]);

  //zjistit kolik zobrazit dni z predesleho mesice
  // --- po delsi uvaze je to jasne... proste firstDayInMonth je takove cislo ktere presne rekne kolik dni se musi predtim zobrazit
  const prevMonthDaysToShow = firstDayInMonth;
  console.log("prevMonthDaysToShow ", prevMonthDaysToShow);

  //zjistit konkretni datumy od predesleho mesice co se maji zobrazit
  const startCalendarFromDate =
    prevMonthDaysToShow === 0 ? 0 : daysInPrevMonth - prevMonthDaysToShow + 1;
  console.log("startCalendarFromDate ", startCalendarFromDate);

  //zjistit kolik zobrazit dni z nasledujiciho mesice
  const nextMonthDaysToShow = 42 - (firstDayInMonth + daysInMonth);
  console.log("nextMonthDaysToShow ", nextMonthDaysToShow);

  if (prevMonthDaysToShow !== 0) {
    for (let i = startCalendarFromDate; i <= daysInPrevMonth; i++) {
      calendar.push({
        day: i,
        month: prevMonth,
        year: prevMonthsYear,
      });
    }
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({
      day: i,
      month,
      year,
    });
  }
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    calendar.push({
      day: i,
      month: nextMonth,
      year: nextMonthsYear,
    });
  }

  console.log(calendar);
  return calendar;
};

export default createCalendar;
