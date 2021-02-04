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
      <div
        className={`dropdown__first visible ${open ? "animate-first" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {selected.name}
        <svg
          width="24"
          height="13"
          viewBox="0 0 24 13"
          // fill="#EEFF05"
          className={`dropdown__arrow ${open ? "animate-arrow" : ""}`}
        >
          <path d="M11.2929 12.2929L0.707107 1.70711C0.0771419 1.07714 0.523309 0 1.41421 0H2.58579C2.851 0 3.10536 0.105356 3.29289 0.292892L11.2929 8.29289C11.6834 8.68342 12.3166 8.68342 12.7071 8.29289L20.7071 0.292893C20.8946 0.105357 21.149 0 21.4142 0H22.5858C23.4767 0 23.9229 1.07714 23.2929 1.70711L12.7071 12.2929C12.3166 12.6834 11.6834 12.6834 11.2929 12.2929Z" />
        </svg>
      </div>
      <div className={`dropdown__menu ${open ? "visible" : ""}`}>
        {renderOptions}
      </div>
    </div>
  );
};

export default Dropdown;
