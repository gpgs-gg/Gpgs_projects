import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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





const UploadClientDocs = async (formData) => {
  // No need to set headers manually for FormData
  const response = await apiClient.post("/client-upload-docs", formData);
  return response.data;
};

export const useUploadClientDocs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UploadClientDocs,
    onSuccess: () => {
      // Invalidate query cache to refetch fresh data
      queryClient.invalidateQueries(["clientsDetails"]);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      // You can add additional error handling here if you want
    },
  });
};




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