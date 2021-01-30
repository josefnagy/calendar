import React from "react";

const Dropdown = ({ options }) => {
  const renderOptions = options.map((option) => {
    return (
      <div key={option.value} className="option">
        {option.name}
      </div>
    );
  });

  return <div className="dropdown">{renderOptions}</div>;
};

export default Dropdown;
