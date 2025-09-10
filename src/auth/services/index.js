import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const apiClient = axios.create({
  baseURL: "https://gpgs-main-server.vercel.app/api", // for vercel deployement
//   baseURL: "http://localhost:3000/api", // for Local Developement
});


const fetchEmployeeDetailsData = async () => {
  const response = await apiClient.get("/Employees-details");
  return response.data;
};

// React Query hook to fetch property data
export const useEmployeeDetails = () => {
  return useQuery({
    queryKey: ["EmployeeDetails"],
    queryFn: fetchEmployeeDetailsData,
  });
};
