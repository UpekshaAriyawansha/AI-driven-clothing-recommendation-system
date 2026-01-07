// src/components/SelectInput.js
import React from "react";

const SelectInput = ({ label, options, value, onChange }) => (
  <div className="col-md-6">
    <label className="form-label bg-black text-white">{label}</label>
    <select
      className="form-select bg-black text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
