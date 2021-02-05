import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

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

const EventForm = ({ onSubmit, id, eventId, event }) => {
  const [selectedEvents, setSelectedEvents] = useState("");
  const [selectedFunctions, setSelectedFunctions] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (event) {
      setSelectedEvents({ name: event.label, type: event.type });
      event.function !== ""
        ? setSelectedFunctions({ name: event.function })
        : "";
      event.location !== ""
        ? setSelectedLocation({ name: event.location })
        : "";
      setNotes(event.notes);
    }
  }, [event]);

  const date = id.split("-");
  const year = Number(date[0]);
  const month = Number(date[1]);
  const day = Number(date[2]);

  const handleAddEvent = () => {
    const formValues = {
      day,
      id,
      month,
      year,
      key: eventId ? eventId : null,
      dateId: year + "-" + month,
      label: selectedEvents.name,
      type: selectedEvents.type,
      function: selectedFunctions ? selectedFunctions.name : "",
      location: selectedLocation ? selectedLocation.name : "",
      notes,
    };

    if (event) {
      const editedValues = difference(formValues, event);
      onSubmit(editedValues);
    } else {
      onSubmit(formValues);
    }
  };

  // function which compare old event and new edited event and returns changes
  const difference = (object, base) => {
    const changes = (object, base) => {
      return _.transform(object, (result, value, key) => {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    };
    return changes(object, base);
  };

  return (
    <div className="center">
      <div className="form">
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
          <Link className="btn__discard" to={`/day/${id}`}>
            Zpět
          </Link>
          <button className="btn__add" onClick={() => handleAddEvent()}>
            Uložit event
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return { event: state.events.editedEvent };
};

export default connect(mapStateToProps, {})(EventForm);
