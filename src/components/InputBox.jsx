import React from "react";

const InputBox = () => {
  return (
    <div className="input__container">
      <input id="input" className="input-box" type="text" />
      <label className="input-label" htmlFor="input">
        note ...
      </label>
    </div>
  );
};

export default InputBox;
