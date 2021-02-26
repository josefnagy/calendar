import React from "react";

const Checkbox = ({ value, setValue, label }) => {
  return (
    <label className="checkbox__container">
      {label}
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
