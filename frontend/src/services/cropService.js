import authService from "./authService";

export const getCrops = () => authService.get("/crops");

export const getCropById = (id) =>
  authService.get(`/crops/${id}`);

export const addCrop = (crop) =>
  authService.post("/crops", crop);

export const updateCrop = (id, crop) =>
  authService.put(`/crops/${id}`, crop);

export const deleteCrop = (id) =>
  authService.delete(`/crops/${id}`);

export const searchByLocation = (location) =>
  authService.get(`/crops/search/location?location=${location}`);