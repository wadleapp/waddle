import React from "react";
import "./SettingsItem.scss";

const SettingsItem = ({ name, description, icon }) => {
  return (
    <div className="settings-item flex-r">
      <div className="settings-icon">{icon && <img src={icon} alt="Icon" />}</div>
      <div className="flex-c settings-text">
        <p className="settings-name text--black">{name}</p>
        <p className="settings-description">{description}</p>
      </div>
    </div>
  );
};

export default SettingsItem;
