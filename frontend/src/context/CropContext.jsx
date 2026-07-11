import { createContext, useContext, useEffect, useState } from "react";
import {
  getCrops,
  addCrop,
  updateCrop,
  deleteCrop,
} from "../services/cropService";
import { useAuth } from "./AuthContext";

const CropContext = createContext();

export function CropProvider({ children }) {
  const { token } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCrops() {
    try {
      const res = await getCrops();
      setCrops(res.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch the current user's crops after authentication becomes available.
  useEffect(() => {
    if (!token) return undefined;

    const loadTimer = window.setTimeout(() => {
      fetchCrops();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [token]);

  const createCrop = async (crop) => {
    const res = await addCrop(crop);
    setCrops((prev) => [...prev, res.data]);
  };

  const editCrop = async (id, crop) => {
    const res = await updateCrop(id, crop);

    setCrops((prev) =>
      prev.map((item) => (item._id === id ? res.data : item))
    );
  };

  const removeCrop = async (id) => {
    await deleteCrop(id);

    setCrops((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CropContext.Provider
      value={{
        crops,
        loading,
        fetchCrops,
        createCrop,
        editCrop,
        removeCrop,
      }}
    >
      {children}
    </CropContext.Provider>
  );
}

export const useCrops = () => useContext(CropContext);
