import React, { useState } from "react";
import InputBox from "./InputBox.jsx";
import Dropdown from "./Dropdown.jsx";

const eventTypes = [
  { name: "Ranní", type: "ranni" },
  { name: "Denní", type: "denni" },
  { name: "Odpolední", type: "odpoledni" },
  { name: "Noční", type: "nocni" },
  { name: "Preventivka", type: "preventivka" },
  { name: "Školení", type: "skoleni" },
  { name: "Paragraf", type: "paragraf" },
  { name: "Nemocenská", type: "nemocenska" },
  { name: "Dovolená", type: "dovolena" },
];

const EventForm = () => {
  return (
    <div className="center">
      <InputBox />
      <Dropdown options={eventTypes} />
    </div>
  );
};

export default EventForm;
