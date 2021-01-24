let calendar = [];
const daysInWeek = [
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle",
];

const monthsName = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
];

const holidays = [
  {
    day: 1,
    month: 1,
    name: "Nový rok",
  },
  {
    day: 1,
    month: 5,
    name: "Svátek Práce",
  },
  {
    day: 8,
    month: 5,
    name: "Den vítězství",
  },
  {
    day: 5,
    month: 7,
    name: "Den slovanských věrozvěstů Cyrila a Metoděje",
  },
  {
    day: 6,
    month: 7,
    name: "Den upálení mistra Jana Husa",
  },
  {
    day: 28,
    month: 9,
    name: "Den české státnosti",
  },
  {
    day: 28,
    month: 10,
    name: "Den vzniku samostatného československého státu",
  },
  {
    day: 17,
    month: 11,
    name: "Den boje za svobodu a demokracii",
  },
  {
    day: 24,
    month: 12,
    name: "Štědrý den",
  },
  {
    day: 25,
    month: 12,
    name: "1. svátek vánoční",
  },
  {
    day: 26,
    month: 12,
    name: "2. svátek vánoční",
  },
];

// const eventTypes = [
//   { name: "Ranní", type: "ranni", value: 10 },
//   { name: "Denní", type: "denni", value: 10 },
//   { name: "Odpolední", type: "odpoledni", value: 8 },
//   { name: "Noční", type: "nocni", value: 8 },
//   { name: "Preventivka", type: "preventivka", value: 2 },
//   { name: "Školení", type: "skoleni", value: 2 },
//   { name: "Paragraf", type: "paragraf", value: 10 },
//   { name: "Nemocenská", type: "nemocenska", value: 10 },
//   { name: "Dovolená", type: "dovolena", value: 10 },
// ];

const events = [
  {
    day: 5,
    month: 1,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 12,
    month: 1,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 25,
    month: 1,
    year: 2021,
    type: "nocni",
    label: "Nocni",
  },
  {
    day: 23,
    month: 1,
    year: 2021,
    type: "odpoledni",
    label: "Odpoledni",
  },
  {
    day: 16,
    month: 1,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
  },
  {
    day: 10,
    month: 1,
    year: 2021,
    type: "nemocenska",
    label: "Nemocenska",
  },
  {
    day: 10,
    month: 2,
    year: 2021,
    type: "paragraf",
    label: "Paragraf",
  },
];

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

  let year = setYear;
  let month = setMonth;

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
  // console.log(prevMonthsYear + " + " + prevMonth + " " + daysInPrevMonth);
  // console.log(nextMonthsYear + " + " + nextMonth + " " + daysInNextMonth);

  // console.log("month: ", month);
  // console.log("year: ", year);

  //zjistit co je konrektne za den 1. v mesici
  // 0 = je pondeli a 6 je nedele
  const firstDayInMonth = new Date(year, month - 1, 0).getDay();

  // console.log("First day in month is ", firstDayInMonth);
  // console.log("First day in month is ", daysInWeek[firstDayInMonth]);

  //zjistit kolik zobrazit dni z predesleho mesice
  // --- po delsi uvaze je to jasne... proste firstDayInMonth je takove cislo ktere presne rekne kolik dni se musi predtim zobrazit
  const prevMonthDaysToShow = firstDayInMonth;
  // console.log("prevMonthDaysToShow ", prevMonthDaysToShow);

  //zjistit konkretni datumy od predesleho mesice co se maji zobrazit
  const startCalendarFromDate =
    prevMonthDaysToShow === 0 ? 0 : daysInPrevMonth - prevMonthDaysToShow + 1;
  // console.log("startCalendarFromDate ", startCalendarFromDate);

  //zjistit kolik zobrazit dni z nasledujiciho mesice
  const nextMonthDaysToShow = 42 - (firstDayInMonth + daysInMonth);
  // console.log("nextMonthDaysToShow ", nextMonthDaysToShow);

  if (prevMonthDaysToShow !== 0) {
    for (let i = startCalendarFromDate; i <= daysInPrevMonth; i++) {
      const holiday = holidays.find((holiday) => {
        return holiday.day === i && holiday.month === prevMonth;
      });

      const event = events.find((event) => {
        return (
          event.day === i &&
          event.month === prevMonth &&
          event.year === prevMonthsYear
        );
      });

      calendar.push({
        day: i,
        month: prevMonth,
        year: prevMonthsYear,
        when: "prev",
        holiday: holiday ? holiday.name : "",
        event: event
          ? {
              type: event.type,
              label: event.label,
            }
          : "",
      });
    }
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const holiday = holidays.find((holiday) => {
      return holiday.day === i && holiday.month === month;
    });

    const event = events.find((event) => {
      return event.day === i && event.month === month && event.year === year;
    });

    const day = {
      day: i,
      month,
      year,
      when: "current",
      holiday: holiday ? holiday.name : "",
      event: event
        ? {
            type: event.type,
            label: event.label,
          }
        : "",
    };
    calendar.push(day);
  }
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    const holiday = holidays.find((holiday) => {
      return holiday.day === i && holiday.month === nextMonth;
    });
    const event = events.find((event) => {
      return (
        event.day === i &&
        event.month === nextMonth &&
        event.year === nextMonthsYear
      );
    });
    calendar.push({
      day: i,
      month: nextMonth,
      year: nextMonthsYear,
      when: "next",
      holiday: holiday ? holiday.name : "",
      event: event
        ? {
            type: event.type,
            label: event.label,
          }
        : "",
    });
  }

  console.log(calendar);
  return calendar;
};

export default createCalendar;