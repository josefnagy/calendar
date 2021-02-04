import React from "react";

const InputBox = ({ label, value, setValue }) => {
  return (
    <div className="input__container">
      <input
        id="input"
        className="input-box"
        type="text"
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
