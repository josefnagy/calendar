import React from "react";

const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 10 10"
    >
      <g transform="translate(-200 -79)">
        <circle cx="205" cy="84" r="5" fill="#FF2525"></circle>
        <text
          x="204.125"
          y="83.004"
          fill="#fff"
          fontFamily="'ArialMT', 'Arial', sans-serif"
          fontSize="12"
          transform="matrix(1 0 0 .88358 -.81 14.454)"
        >
          !
        </text>
      </g>
    </svg>
  );
};

const InputBox = ({ type, label, value, setValue, id, error }) => {
  return (
    <div className="input__container">
      <input
        id={id}
        className="input-box"
        type={type}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="input-label" htmlFor="input">
        {label}
      </label>
      <p className="input__error">{error ? error : ""}</p>
    </div>
  );
};

export default InputBox;
