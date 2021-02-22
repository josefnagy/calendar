import React from "react";
import { useSelector } from "react-redux";

import StatsCard from "./StatsCard.jsx";

const Stats = () => {
  const renderStats = () => {
    const date = useSelector((state) => state.date);
    const dateId = `${date.calYear}-${date.calMonth}`;
    const stats = useSelector((state) => state.stats[dateId]);

    if (typeof stats !== "undefined") {
      const workingHoursForMonth = stats.shifts.workingHoursForMonth;
      const totalWorkedHours =
        stats.shifts.workedHoursIn6 +
        stats.shifts.workedHoursIn7 +
        stats.shifts.paymentInHolidayAverage;
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
        stats.shifts.paymentInHolidayAverage * average
      );
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
        overtimeBonus +
        holidayBonus +
        weekendBonus +
        nightBonus +
        afternoonBonus +
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

      const wageAfterTax =
        wageBeforeTax -
        taxRounded -
        healthInsurance -
        socialInsurance +
        taxBonus;

      // // tady to nejak doladit v budoucnu

      const shifts = [
        {
          label: "Fond Pracovní doby",
          value: stats.shifts.workingHoursForMonth,
        },
        {
          label: "Počet směn",
          value: stats.shifts.workingEvents,
        },
        {
          label: "Hodinová mzda v 6",
          value: stats.shifts.workedHoursIn6,
        },
        {
          label: "Hodinová mzda v 7",
          value: stats.shifts.workedHoursIn7,
        },
        {
          label: "Platba Průměrem",
          value: stats.shifts.paymentInHolidayAverage,
        },
        {
          label: "Překážka v práci",
          value: stats.shifts.obstacleInWork,
        },
        {
          label: "Nemocenská",
          value: stats.shifts.sickLeaveDays,
        },
        {
          label: "Náhradní volno",
          value: stats.shifts.nv,
        },
        {
          label: "Přesčasů",
          value: overtimeHours,
        },
      ];

      const extras = [
        {
          label: "Sobota / Neděle",
          value: stats.extras.weekendShiftBonus,
        },
        {
          label: "noční (25 Kč)",
          value: stats.extras.nightShiftBonus,
        },
        {
          label: "Odpolední (3 Kč)",
          value: stats.extras.afternoonShiftBonus,
        },
        {
          label: "Svátek",
          value: stats.extras.holidayShiftBonus,
        },
      ];

      const wage = [
        {
          label: "Hodinová mzda v 6. třídě",
          value: wageFor6,
        },
        {
          label: "Hodinová mzda v 7. třídě",
          value: wageFor7,
        },
        {
          label: "Platba Průměrem",
          value: averagePayment,
        },
        {
          label: "Přesčas",
          value: overtimeBonus,
        },
        {
          label: "Svátek",
          value: holidayBonus,
        },
        {
          label: "Sobota / Neděle",
          value: weekendBonus,
        },
        {
          label: "Noční",
          value: nightBonus,
        },
        {
          label: "Odpolední",
          value: afternoonBonus,
        },
        {
          label: "Prémie za Heřmanice",
          value: bonusHer,
        },
        {
          label: "Prémie za Uhelnou službu",
          value: bonusUsl,
        },
        {
          label: "Hrubá mzda",
          value: wageBeforeTax,
        },
        {
          label: "Čistá mzda",
          value: wageAfterTax,
        },
      ];

      return (
        <>
          <StatsCard title="Směny" stats={shifts} />
          <StatsCard title="Příplatky" stats={extras} />
          <StatsCard title="Mzda" stats={wage} />
          <StatsCard title="Ostatní" stats={shifts} />
        </>
      );
    } else {
      return "Sorry, musis prvni pridat nejake eventy abys mohl videt statistiky";
    }
  };

  return <div className="stats">{renderStats()}</div>;
};

export default Stats;
