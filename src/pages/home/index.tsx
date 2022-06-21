import Car from 'components/Car';
import React, { useEffect, useState } from 'react';
import { ICar, carApi } from 'services/car';

function Home() {
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [carColors, setCarColors] = useState<string[]>([]);

  const [type, setType] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const [carsData, setCarsData] = useState<ICar[]>([]);
  useEffect(() => {
    const getCarOptions = async () => {
      const [carTypesData, carModelsData, carColorsData] = await Promise.all([
        carApi.getCarOptions('type'),
        carApi.getCarOptions('model'),
        carApi.getCarOptions('color'),
      ]);
      setCarTypes(carTypesData);
      setCarModels(carModelsData);
      setCarColors(carColorsData);
    };
    getCarOptions();
  }, []);

  useEffect(() => {
    const getCarData = async () => {
      const cars = await carApi.getCarsByParams(type, model, color);
      setCarsData(cars);
    };
    getCarData();
  }, [type, model, color]);

  const onChangeSelect = (callback: (e: any) => void) => (e: any) => {
    callback(e.target.value);
  };
  return (
    <div>
      <h2>Cars Store</h2>
      <form style={{ marginBottom: '24px' }}>
        {carTypes.length && (
          <div>
            <label htmlFor="carType" style={{ width: '80px', display: 'inline-block' }}>
              Type
            </label>
            <select id="carType" value={type} placeholder="Select car type" onChange={onChangeSelect(setType)}>
              {carTypes.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        {carModels.length && (
          <div>
            <label htmlFor="carModel" style={{ width: '80px', display: 'inline-block' }}>
              Model
            </label>
            <select id="carModel" value={model} placeholder="Select car model" onChange={onChangeSelect(setModel)}>
              {carModels.map((model, index) => (
                <option value={model} key={index}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}
        {carColors.length && (
          <div>
            <label htmlFor="carColor" style={{ width: '80px', display: 'inline-block' }}>
              Color
            </label>
            <select id="carColor" value={color} placeholder="Select car color" onChange={onChangeSelect(setColor)}>
              {carColors.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
      {!!carsData.length && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '32px', rowGap: '32px' }}>
          {carsData.map(({ type, model, color, model_year }, index) => (
            <Car key={index} type={type} model={model} color={color} model_year={model_year} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
