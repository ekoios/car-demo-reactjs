import React, { FC } from 'react';

interface CustomSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (callback: any) => void;
  options: string[];
}

const CustomSelect: FC<CustomSelectProps> = ({ label, id, value, onChange, options }) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label htmlFor={id} style={{ width: '80px', display: 'inline-block' }}>
        {label}
      </label>
      <select id={id} value={value} placeholder="Select car type" onChange={onChange}>
        {options.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
