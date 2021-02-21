import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { eventTypes, functionTypes, locationTypes } from "../js/eventsConfig";
import InputBox from "./InputBox.jsx";
import Dropdown from "./Dropdown.jsx";

const EventForm = ({ onSubmit, id, eventId, eventToEdit }) => {
  const [selectedEvents, setSelectedEvents] = useState("");
  const [selectedFunctions, setSelectedFunctions] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showWorkingHoursInput, setShowWorkingHoursInput] = useState(false);
  const [workingHours, setWorkingHours] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setSelectedEvents({
        name: eventToEdit.label,
        type: eventToEdit.type,
        defaultWorkingHours: eventToEdit.defaultWorkingHours,
        workingHoursType: eventToEdit.workingHoursType,
      });
      eventToEdit.function !== ""
        ? setSelectedFunctions({ name: eventToEdit.function })
        : "";
      eventToEdit.location !== ""
        ? setSelectedLocation({ name: eventToEdit.location })
        : "";
      setWorkingHours(eventToEdit.workingHours);
      setNotes(eventToEdit.notes);
    }
  }, [eventToEdit]);

  useEffect(() => {
    if (selectedEvents.type !== "custom" && selectedEvents.type) {
      setShowWorkingHoursInput(true);

      if (!eventToEdit) {
        setWorkingHours(selectedEvents.defaultWorkingHours);
      }
    }
  }, [selectedEvents]);

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
      workingHours: workingHours ? workingHours : null,
      workingHoursType: selectedEvents.workingHoursType,
      notes,
    };

    if (eventToEdit) {
      const editedValues = difference(formValues, eventToEdit);
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
        <div className="event-types__wrapper">
          <Dropdown
            options={eventTypes}
            selected={selectedEvents}
            setSelected={setSelectedEvents}
            label="Event Type"
          />
          {showWorkingHoursInput ? (
            <InputBox
              label=""
              value={workingHours}
              type="text"
              setValue={setWorkingHours}
              id="workingHours"
            />
          ) : (
            ""
          )}
        </div>

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
        <InputBox
          label="Notes"
          value={notes}
          type="text"
          setValue={setNotes}
          id="notes"
        />
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

export default connect(null, {})(EventForm);
