import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderOptions = options.map((option) => {
    if (option.type === selected.type) {
      return null;
    }

    return (
      <div
        key={option.type}
        className="dropdown__option"
        onClick={() => {
          setSelected(option);
          setOpen(!open);
        }}
      >
        {option.name}
      </div>
    );
  });

  const renderLabel = () => {
    let label = "dropdown__label";
    if (open && selected === "") {
      label += " animate-label";
    } else if ((!open && selected !== "") || (open && selected !== "")) {
      label += " test";
    }
    return label;
  };

  return (
    <div className="dropdown" ref={ref}>
      <label className={renderLabel()}>Event type...</label>
      <div className="dropdown__first visible" onClick={() => setOpen(!open)}>
        {selected.name}
      </div>
      <div className={`dropdown__menu ${open ? "visible" : ""}`}>
        {renderOptions}
      </div>
    </div>
  );
};

export default Dropdown;
