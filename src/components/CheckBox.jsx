import React from "react";

const Checkbox = ({ value, setValue, label }) => {
  return (
    <label className="checkbox__container">
      {label}
      <input
        type="checkbox"
        checked={value}
        // value={value}
        onChange={() => setValue(!value)}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
