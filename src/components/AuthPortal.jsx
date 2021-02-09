import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AuthPortal = ({ isOpen, children, setOpen }) => {
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      console.log(e.target);
      if (ref.current && ref.current.contains(e.target)) {
        console.log("now");
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  if (!isOpen) return null;
  return createPortal(
    <div className="authModal" ref={ref}>
      {children}
    </div>,
    document.body
  );
};

export default connect(null, {})(AuthPortal);
