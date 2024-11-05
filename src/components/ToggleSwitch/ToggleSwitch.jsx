import "./ToggleSwitch.css";

function ToggleSwitch({ isOn, handleToggleChange }) {
  return (
    <div className="toggle">
      <input
        id="toggle__input"
        type="checkbox"
        className="toggle__input"
        checked={isOn}
        onChange={handleToggleChange}
      />
      <label htmlFor="toggle__input" className="toggle__label">
        <span className="toggle__button" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
