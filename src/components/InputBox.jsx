import React from "react";

const InputBox = ({ type, label, value, setValue, id }) => {
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
    </div>
  );
};

export default InputBox;
