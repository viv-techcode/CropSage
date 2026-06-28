import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/crops",
});


export const getCrops = () => API.get("/");


export const getCropById = (id) => API.get(`/${id}`);


export const addCrop = (crop) => API.post("/", crop);


export const updateCrop = (id, crop) => API.put(`/${id}`, crop);


export const deleteCrop = (id) => API.delete(`/${id}`);


export const searchByLocation = (location) =>
    API.get(`/search/location?location=${location}`);