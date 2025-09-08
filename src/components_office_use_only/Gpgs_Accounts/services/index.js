import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://gpgs-main-server.vercel.app/api", // change later for production
  // baseURL: "http://localhost:3000/api", // change later for production
}); 

// Function to fetch data from the API
const fetchSingleSheetData = async () => {
  const { data } = await api.get('/properties-data');
  return data;
};

// Custom hook to use the query
export const useFetchSingleSheetData = () => {
  return useQuery({
    queryKey: ['singleSheetData'],
    queryFn: fetchSingleSheetData,
  });
};
// export default useFetchSingleSheetData;

const fetchPropertySheetData = async (sheetId) => {
  if(sheetId){
    const response = await api.get(`/property-sheet-data-for-accounts?sheetId=${sheetId}`);
    return response.data;
  }
};

export const usePropertySheetData = (sheetId, enabled) => {
  return useQuery({
    queryKey: ["property-sheet-data-for-accounts", sheetId],
    queryFn: () => fetchPropertySheetData(sheetId),
    enabled: !!sheetId && enabled, // Only fetch when sheetId is available
  });
};

// POST request to send booking data
const addBooking = async (data) => {
     console.log("data", data)
  const response = await api.post("/update-rnr-sheet", data);
  return response.data;
};

export const useAddBooking = () => {  
  return useMutation({
    mutationFn: addBooking,
  });   
};