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
    <div className="custom-select">
      <label htmlFor={id} className="custom-select__label">
        {label}
      </label>
      <select id={id} value={value} placeholder="Select car type" onChange={onChange}>
        {!!options?.length &&
          options.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CustomSelect;
