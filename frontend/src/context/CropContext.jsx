import { createContext, useContext, useState } from "react";

const CropContext = createContext();

const initialCrops = [
  {
    id: 1,
    name: "Wheat",
    quantity: 500,
    unit: "kg",
    location: "Dehradun",
    price: 28,
    season: "Rabi",
    status: "Growing",
    notes: "",
  },
  {
    id: 2,
    name: "Rice",
    quantity: 750,
    unit: "kg",
    location: "Haridwar",
    price: 36,
    season: "Kharif",
    status: "Planned",
    notes: "",
  },
  {
    id: 3,
    name: "Maize",
    quantity: 200,
    unit: "kg",
    location: "Roorkee",
    price: 24,
    season: "Kharif",
    status: "Harvested",
    notes: "",
  },
];

export function CropProvider({ children }) {
  const [crops, setCrops] = useState(initialCrops);

  return (
    <CropContext.Provider value={{ crops, setCrops }}>
      {children}
    </CropContext.Provider>
  );
}

export const useCrops = () => useContext(CropContext);