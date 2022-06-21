import React, { FC } from 'react';
import { ICar } from 'services/car';

const Car: FC<ICar> = ({ type, model, color, model_year }) => {
  const CarElement = ({ label, value }: { label: string; value: string | number }) => (
    <p>
      {label}: <b>{value}</b>
    </p>
  );

  const carPropeties = [
    {
      label: 'Type',
      value: type,
    },
    {
      label: 'Model',
      value: model,
    },
    {
      label: 'Color',
      value: color,
    },
    {
      label: 'Model Year',
      value: model_year,
    },
  ];

  return (
    <div className="car">
      {carPropeties.map((item, index) => (
        <CarElement key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default Car;
