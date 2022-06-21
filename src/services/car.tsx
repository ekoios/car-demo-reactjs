import cars from 'constants/cars.json';

export interface ICar {
  type: string;
  model: string;
  color: string;
  model_year: number;
}

export const carApi = {
  getCarOptions(key: 'type' | 'model' | 'color'): Promise<string[]> {
    const typesArr = cars.map((car) => car[key]);
    const typesArrDistinct = Array.from(new Set(typesArr));
    return new Promise((resolve, reject) => {
      if (typesArrDistinct) resolve(typesArrDistinct);
      else reject('Error!');
    });
  },
  getCarsByParams(type?: string, model?: string, color?: string): Promise<ICar[]> {
    let carsData = [...cars];
    if (type) carsData = carsData.filter((car) => car.type === type);
    if (model) carsData = carsData.filter((car) => car.model === model);
    if (color) carsData = carsData.filter((car) => car.color === color);
    return new Promise((resolve, reject) => {
      if (carsData) resolve(carsData);
      else reject('Error!');
    });
  },
};
