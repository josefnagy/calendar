import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { URL } from "../js/config";
import Arrows from "./Arrows.jsx";

const Header = ({ date }) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [hidden, setHidden] = useState("");
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    console.log(date);
    console.log(window.location.pathname);
    const path = URL || "/";
    console.log(path);

    if (window.location.pathname !== path) {
      const str = window.location.pathname.split("/");

      if (str[1] === "day") {
        const dayId = str[2] ? str[2].split("-") : 0;
        setDay(dayId[2]);
        setMonth(dayId[1]);
        setYear(dayId[0]);
      } else if (str[1] === "month") {
        setDay(undefined);
        setYear(str[2]);
        setMonth(str[3]);
      }
    } else {
      console.log("clicked on today");
      setDay(undefined);
      setMonth(date.calMonth);
      setYear(date.calYear);
    }

    if (window.location.pathname === "/signup") setHidden("");
    else setHidden("");
  });

  return (
    <header className={`header ${hidden}`}>
      <Link
        to={`${URL}/month/${date.calYear}/${date.calMonth}`}
        className="header__date"
      >{`${day ? day + "." : ""} ${
        month
          ? date.monthsNames[month - 1]
          : date.monthsNames[date.calMonth - 1]
      } ${year ? year : date.calYear}`}</Link>
      <div className="header__links">
        {isSignedIn ? (
          <Link
            to={`${URL}/stats/${date.calYear}/${date.calMonth}`}
            className="header__link"
          >
            <svg
              height="30pt"
              viewBox="0 0 512 512"
              width="30pt"
              className="header__stats-icon"
            >
              <path
                d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
                fill="url(#a)"
              />
              <g fill="#fff" className="header__stats-icon">
                <path d="m383.207031 92.375h-38.6875c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h28.910157l-91.105469 91.085938c-2.191407 2.191406-5.035157 3.402343-7.835938 3.367187-2.625-.046875-5.332031-1.277344-7.425781-3.367187l-15.164062-15.164063c-7.808594-7.808594-18.199219-12.335937-28.507813-12.421875-.101563 0-.199219 0-.300781 0-10.664063 0-21.296875 4.644531-29.230469 12.773438l-27.625 27.75c-5.84375 5.871093-5.824219 15.371093.046875 21.214843 2.929688 2.914063 6.753906 4.371094 10.582031 4.371094 3.851563 0 7.699219-1.476563 10.628907-4.417969l27.691406-27.8125c.042968-.042968.085937-.089844.128906-.132812 2.285156-2.351563 5.183594-3.75 7.773438-3.75h.0625c2.464843.023437 5.28125 1.378906 7.539062 3.636718l15.160156 15.164063c7.640625 7.640625 17.613282 11.957031 28.085938 12.148437 10.910156.214844 21.683594-4.226562 29.605468-12.148437l90.460938-90.441406v26.980469c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-38.042969c0-22.492188-18.300781-40.792969-40.792969-40.792969zm0 0" />
                <path d="m118.882812 275.546875-25.648437 26.4375c-5.769531 5.945313-5.625 15.441406.320313 21.207031 2.914062 2.828125 6.679687 4.234375 10.445312 4.234375 3.914062 0 7.824219-1.523437 10.765625-4.554687l25.648437-26.4375c5.769532-5.945313 5.625-15.441406-.320312-21.210938-5.945312-5.765625-15.441406-5.625-21.210938.324219zm0 0" />
                <path d="m180.089844 285.34375c-7.121094 0-12.898438 5.773438-12.898438 12.894531v113.492188c0 7.121093 5.777344 12.894531 12.898438 12.894531s12.894531-5.773438 12.894531-12.894531v-113.488281c0-7.125-5.773437-12.898438-12.894531-12.898438zm0 0" />
                <path d="m230.386719 256.972656c-7.125 0-12.898438 5.773438-12.898438 12.894532v141.863281c0 7.121093 5.773438 12.894531 12.898438 12.894531 7.121093 0 12.894531-5.773438 12.894531-12.894531v-141.863281c0-7.121094-5.773438-12.894532-12.894531-12.894532zm0 0" />
                <path d="m129.191406 343.378906c-7.140625-.023437-12.941406 5.757813-12.941406 12.894532v55.457031c0 7.121093 5.773438 12.894531 12.898438 12.894531 7.121093 0 12.894531-5.773438 12.894531-12.894531v-55.457031c0-7.101563-5.746094-12.871094-12.851563-12.894532zm0 0" />
                <path d="m331.574219 248.589844c-7.105469.027344-12.847657 5.792968-12.847657 12.894531v150.246094c0 7.121093 5.773438 12.894531 12.894532 12.894531s12.898437-5.773438 12.898437-12.894531v-150.246094c0-7.140625-5.804687-12.921875-12.945312-12.894531zm0 0" />
                <path d="m382.5625 204.742188c-7.121094 0-12.894531 5.773437-12.894531 12.894531v194.09375c0 7.121093 5.773437 12.894531 12.894531 12.894531 7.125 0 12.898438-5.773438 12.898438-12.894531v-194.089844c0-7.125-5.777344-12.898437-12.898438-12.898437zm0 0" />
                <path d="m280.679688 273.09375c-7.121094 0-12.894532 5.773438-12.894532 12.894531v125.742188c0 7.121093 5.773438 12.894531 12.894532 12.894531h.003906c7.121094 0 12.894531-5.773438 12.894531-12.894531v-125.742188c0-7.121093-5.773437-12.894531-12.898437-12.894531zm0 0" />
              </g>
            </svg>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="header__arrows">
        <Arrows />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.date,
    day: state.events.selectedDay.day,
    month: state.events.selectedDay.month,
    year: state.events.selectedDay.year,
  };
};

export default connect(mapStateToProps)(Header);
