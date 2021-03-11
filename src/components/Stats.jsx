import React from "react";
import { useSelector } from "react-redux";

import StatsCard from "./StatsCard.jsx";

const Stats = () => {
  const renderStats = () => {
    const date = useSelector((state) => state.date);
    const dateId = `${date.calYear}-${date.calMonth}`;
    const stats = useSelector((state) => state.stats[dateId]);
    const vacation = useSelector((state) =>
      state.stats.vacation ? state.stats.vacation[date.calYear] : null
    );
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    if (typeof stats !== "undefined" && isSignedIn) {
      const workingHoursForMonth = stats.shifts.workingHoursForMonth;
      const totalWorkedHours =
        stats.shifts.workedHoursIn6 +
        stats.shifts.workedHoursIn7 +
        stats.shifts.paymentIntoAverage;
      const overtimeHours =
        workingHoursForMonth < totalWorkedHours
          ? totalWorkedHours - workingHoursForMonth
          : 0;
      const tarif6 = 133;
      const tarif7 = 151.3;
      const bonusHerPerHour = 23.4;
      const bonusUslPerHour = 21;

      const average = 227.12;
      const overtimeBonusRate = 35;
      const overtimeBonusPerHour = (average / 100) * overtimeBonusRate;
      const holidayBonusRate = 100;
      const holidayBonusPerHour = (average / 100) * holidayBonusRate;
      const weekendBonusRate = 25;
      const weekendBonusPerHour = (average / 100) * weekendBonusRate;
      const nightBonusPerHour = 25;
      const afternoonBonusPerHour = 3;

      const wageFor6 = Math.round(stats.shifts.workedHoursIn6 * tarif6);
      const wageFor7 = Math.round(stats.shifts.workedHoursIn7 * tarif7);
      const averagePayment = Math.round(
        stats.shifts.paymentIntoAverage * average
      );
      const obstacleInWorkBonus = Math.round(
        stats.shifts.obstacleInWork * average
      );

      const vacationBonus = Math.round(stats.shifts.vacation * average);

      const overtimeBonus = Math.round(overtimeBonusPerHour * overtimeHours);
      const holidayBonus = Math.round(
        stats.extras.holidayShiftBonus * holidayBonusPerHour
      );
      const weekendBonus = Math.round(
        weekendBonusPerHour * stats.extras.weekendShiftBonus
      );
      const nightBonus = Math.round(
        stats.extras.nightShiftBonus * nightBonusPerHour
      );
      const afternoonBonus = Math.round(
        afternoonBonusPerHour * stats.extras.afternoonShiftBonus
      );
      const bonusHer = Math.round(
        stats.shifts.workedHoursIn6 * bonusHerPerHour
      );
      const bonusUsl = Math.round(
        stats.shifts.workedHoursIn7 * bonusUslPerHour
      );

      const wageBeforeTax =
        wageFor6 +
        wageFor7 +
        averagePayment +
        obstacleInWorkBonus +
        vacationBonus +
        overtimeBonus +
        holidayBonus +
        weekendBonus +
        nightBonus +
        afternoonBonus +
        stats.extras.unscheduledBonus +
        bonusHer +
        bonusUsl;

      const taxRate = 15;
      const tax = Math.round((wageBeforeTax / 100) * taxRate);
      const taxRounded = Math.ceil(tax / 10) * 10;

      const healthInsuranceRate = 4.5;
      const socialInsuranceRate = 6.5;
      const healthInsurance = Math.round(
        (wageBeforeTax / 100) * healthInsuranceRate
      );

      const socialInsurance = Math.round(
        (wageBeforeTax / 100) * socialInsuranceRate
      );
      const taxBonus = 2320;

      const taxesWithInsurances =
        taxRounded + healthInsurance + socialInsurance;

      const wageAfterTax = wageBeforeTax - taxesWithInsurances + taxBonus;
      const formateHours = (value) => `${value} hodin`;
      const formateMoney = (value) => {
        const money = value.toString();
        if (money.length >= 3) {
          const hundreds = money.slice(-3, 10);
          const thousands = money.slice(0, -3);
          return `${thousands} ${hundreds} Kč`;
        } else return `${money} Kč`;
      };

      const shifts = [
        {
          label: "Fond Pracovní doby",
          value: formateHours(stats.shifts.workingHoursForMonth),
        },
        {
          label: "Počet směn",
          value: stats.shifts.workingEvents,
        },
        {
          label: "Hodinová mzda v 6",
          value: formateHours(stats.shifts.workedHoursIn6),
        },
        {
          label: "Hodinová mzda v 7",
          value: formateHours(stats.shifts.workedHoursIn7),
        },
        {
          label: "Dovolená",
          value: formateHours(stats.shifts.vacation),
        },
        {
          label: "Platba Průměrem",
          value: formateHours(stats.shifts.paymentIntoAverage),
        },
        {
          label: "Překážka v práci",
          value: formateHours(stats.shifts.obstacleInWork),
        },
        {
          label: "Nemocenská",
          value: formateHours(stats.shifts.sickLeaveDays),
        },
        {
          label: "Náhradní volno",
          value: formateHours(stats.shifts.nv),
        },
        {
          label: "Přesčasů",
          value: formateHours(overtimeHours),
        },
      ];

      const extras = [
        {
          label: "Sobota / Neděle",
          value: formateHours(stats.extras.weekendShiftBonus),
        },
        {
          label: "noční (25 Kč)",
          value: formateHours(stats.extras.nightShiftBonus),
        },
        {
          label: "Odpolední (3 Kč)",
          value: formateHours(stats.extras.afternoonShiftBonus),
        },
        {
          label: "Svátek",
          value: formateHours(stats.extras.holidayShiftBonus),
        },
      ];

      const wage = [
        {
          label: "Hodinová mzda v 6. třídě",
          value: formateMoney(wageFor6),
        },
        {
          label: "Hodinová mzda v 7. třídě",
          value: formateMoney(wageFor7),
        },
        {
          label: "Platba Průměrem",
          value: formateMoney(averagePayment),
        },
        {
          label: "Dovolená",
          value: formateMoney(vacationBonus),
        },
        {
          label: "Překážka v práci",
          value: formateMoney(obstacleInWorkBonus),
        },
        {
          label: "Přesčas",
          value: formateMoney(overtimeBonus),
        },
        {
          label: "Svátek",
          value: formateMoney(holidayBonus),
        },
        {
          label: "Sobota / Neděle",
          value: formateMoney(weekendBonus),
        },
        {
          label: "Noční",
          value: formateMoney(nightBonus),
        },
        {
          label: "Odpolední",
          value: formateMoney(afternoonBonus),
        },
        {
          label: "Avízo",
          value: formateMoney(stats.extras.unscheduledBonus),
        },
        {
          label: "Prémie za Heřmanice",
          value: formateMoney(bonusHer),
        },
        {
          label: "Prémie za Uhelnou službu",
          value: formateMoney(bonusUsl),
        },
        {
          label: "Hrubá mzda",
          value: formateMoney(wageBeforeTax),
        },
        {
          label: "Čistá mzda",
          value: formateMoney(wageAfterTax),
        },
      ];

      const others = [
        {
          label: "Celkem Dovolená",
          value: vacation.totalVacation,
        },
        {
          label: "Čerpaná",
          value: vacation.usedVacation,
        },
      ];

      return (
        <>
          <StatsCard title="Směny" stats={shifts} className="shifts" />
          <StatsCard title="Příplatky" stats={extras} className="extras" />
          <StatsCard title="Mzda" stats={wage} className="wage" />
          <StatsCard title="Ostatní" stats={others} className="others" />
        </>
      );
    } else {
      return "Sorry, musis prvni pridat nejake eventy abys mohl videt statistiky";
    }
  };

  return <div className="stats">{renderStats()}</div>;
};

export default Stats;
