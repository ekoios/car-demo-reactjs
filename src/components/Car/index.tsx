import React, { FC } from 'react';
import { ICar } from 'services/car';

const Car: FC<ICar> = ({ type, model, color, model_year }) => {
  return (
    <div className="car">
      <p>
        Type: <b>{type}</b>
      </p>
      <p>
        Model: <b>{model}</b>
      </p>
      <p>
        Color: <b>{color}</b>
      </p>
      <p>
        Model Year <b>{model_year}</b>
      </p>
    </div>
  );
};

export default Car;
