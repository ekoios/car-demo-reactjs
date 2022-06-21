import React, { useEffect, useState } from 'react';
import Car from 'components/Car';
import { carApi, ICar } from 'services/car';
import CustomSelect from 'components/Select';
import './styles.scss';

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
      try {
        const [carTypesData, carModelsData, carColorsData] = await Promise.all([
          carApi.getCarOptions('type'),
          carApi.getCarOptions('model'),
          carApi.getCarOptions('color'),
        ]);
        setCarTypes(carTypesData);
        setCarModels(carModelsData);
        setCarColors(carColorsData);
      } catch (error) {
        //handle error
      }
    };
    getCarOptions();
  }, []);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const cars = await carApi.getCarsByParams(type, model, color);
        setCarsData(cars);
      } catch (error) {
        //handle error
      }
    };
    getCarData();
  }, [type, model, color]);

  const onChangeSelect = (callback: (e: any) => void) => (e: any) => {
    callback(e.target.value);
  };
  return (
    <div className="layout">
      <h2>Cars Store</h2>
      <form className="form">
        {carTypes.length && (
          <CustomSelect label="Type" id="carType" value={type} onChange={onChangeSelect(setType)} options={carTypes} />
        )}
        {carModels.length && (
          <CustomSelect
            label="Model"
            id="carModel"
            value={model}
            onChange={onChangeSelect(setModel)}
            options={carModels}
          />
        )}
        {carColors.length && (
          <CustomSelect
            label="Color"
            id="carColor"
            value={color}
            onChange={onChangeSelect(setColor)}
            options={carColors}
          />
        )}
      </form>
      {!!carsData.length && (
        <div className="container">
          {carsData.map(({ type, model, color, model_year }, index) => (
            <Car key={index} type={type} model={model} color={color} model_year={model_year} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
