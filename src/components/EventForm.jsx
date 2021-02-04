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

const functionTypes = [
  { name: "Strojvedoucí", type: "str" },
  { name: "Vlakvedoucí", type: "vv" },
  { name: "Vedoucí posunu", type: "vp" },
  { name: "posunovač", type: "p" },
  { name: "Staniční dozorce", type: "std" },
  { name: "Civilista", type: "cv" },
  { name: "Ostatní..", type: "other" },
];

const locationTypes = [
  { name: "Uhelná služba", type: "usl" },
  { name: "Základní závod", type: "zz" },
  { name: "Heřmanice", type: "her" },
  { name: "Muglinov", type: "mug" },
  { name: "Hornická poliklinika", type: "hp" },
  { name: "Ostatní..", type: "other" },
];

const EventForm = () => {
  const [selectedEvents, setSelectedEvents] = useState("");
  const [selectedFunctions, setSelectedFunctions] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [notes, setNotes] = useState("");

  console.log(selectedLocation);

  return (
    <div className="center">
      <form className="form">
        <Dropdown
          options={eventTypes}
          selected={selectedEvents}
          setSelected={setSelectedEvents}
          label="Event Type"
        />
        <Dropdown
          options={functionTypes}
          selected={selectedFunctions}
          setSelected={setSelectedFunctions}
          label="Function"
        />
        <Dropdown
          options={locationTypes}
          selected={selectedLocation}
          setSelected={setSelectedLocation}
          label="Location"
        />
        <InputBox label="Notes" value={notes} setValue={setNotes} />
        <div className="form__buttons">
          <button className="btn__discard">Zahodit změny</button>
          <button className="btn__add">Uložit event</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
