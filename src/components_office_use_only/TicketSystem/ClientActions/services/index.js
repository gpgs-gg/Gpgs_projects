import {useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gpgs-main-server.vercel.app/api", // for vercel deployement
  // baseURL: "http://localhost:3000/api", // for Local Developement
});

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



const fetchPropertySheetData = async (sheetId) => {
  if (!sheetId || sheetId.length === 0) {
    return [];
  }
  const response = await apiClient.get(`/property-sheet-data-for-Client?sheetId=${sheetId}`);
  return response.data;
};

export const usePropertySheetData = (sheetId, enabled = true) => {
  return useQuery({
    queryKey: ["property-sheet", sheetId],
    queryFn: () => fetchPropertySheetData(sheetId),
    enabled: !!sheetId && enabled,
    initialData: [], // optional, safe default value
  });
};
