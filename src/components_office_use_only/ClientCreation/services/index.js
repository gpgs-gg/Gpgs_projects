import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gpgs-main-server.vercel.app/api", // for vercel deployement
  // baseURL: "http://localhost:3000/api", // for Local Developement
});

const fetchClientDetailsData = async () => {
  const response = await apiClient.get("/Clients-details");
  return response.data;
};

// React Query hook to fetch property data
export const useClientDetails = () => {
  return useQuery({
    queryKey: ["clientsDetails"],
    queryFn: fetchClientDetailsData,
  });
};


const fetchPropertyData = async () => {
  const response = await apiClient.get("/properties-data");
  return response.data;
};

// React Query hook to fetch property data
export const usePropertyData = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchPropertyData,
  });
};