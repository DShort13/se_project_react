// import { useState } from "react";
import React, { useState } from "react";
import "./ToggleSwitch.css";

// import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  // const { currentTemperatureUnit, handleToggleSwitchChange } = useState("C");
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  const handleChange = (e) => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };

  console.log(currentTemperatureUnit);
  return (
    <label htmlFor="toggle__input" className="toggle">
      <input
        id="toggle__input"
        type="checkbox"
        className="toggle__input"
        onChange={handleChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggle__slider toggle__slider-F"
            : "toggle__slider toggle__slider-C"
        }
      />
      <p
        className={`toggle__temp-F ${
          currentTemperatureUnit === "F" && "toggle__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle__temp-C ${
          currentTemperatureUnit === "C" && "toggle__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
