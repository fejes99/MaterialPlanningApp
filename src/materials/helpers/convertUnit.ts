import { MaterialUnit } from '../types/MaterialUnit';

const conversionFactors: { [key: string]: { [key: string]: number } } = {
  [MaterialUnit.Grams]: {
    [MaterialUnit.Kilograms]: 0.001,
    [MaterialUnit.Milligrams]: 1000,
  },
  [MaterialUnit.Kilograms]: {
    [MaterialUnit.Grams]: 1000,
    [MaterialUnit.Milligrams]: 1000000,
  },
  [MaterialUnit.Milligrams]: {
    [MaterialUnit.Grams]: 0.001,
    [MaterialUnit.Kilograms]: 0.000001,
  },
};

export const convertUnit = (quantity: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return quantity;

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  if (conversionFactor !== undefined) {
    return quantity * conversionFactor;
  } else {
    throw new Error('Nije moguce konvertovati date tipove');
  }
};
