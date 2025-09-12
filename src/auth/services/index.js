import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const apiClient = axios.create({
  baseURL: "https://gpgs-main-server.vercel.app/api", // for vercel deployement
  // baseURL: "http://localhost:3000/api", // for Local Developement
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






// ✅ Update Ticket Sheet
const changePassword= async (data) => {
  const response = await apiClient.post("/change-password", data);
  return response.data;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // 🔄 Refetch ticket sheet after update
      queryClient.invalidateQueries(["change-password"]);
    },
  });
};
