import React from "react";
import "./TextField.scss";

const TextField = ({ setValue, type = "text", fieldValue, placeholder, inputMode = "" }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="text-field-container">
      <div className="text-field">
        <input
          type={type}
          value={fieldValue}
          onChange={handleChange}
          placeholder={placeholder}
          inputMode={inputMode}
        />
      </div>
    </div>
  );
};

export default TextField;
