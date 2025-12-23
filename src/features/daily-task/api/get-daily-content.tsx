import axiosInstance from "@/lib/api/axios.config";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_DAILY_TASK } from "../routes";

const getDailyContent = async () => {
	const response = await axiosInstance.get(ENDPOINTS_DAILY_TASK.TODAY);
	return response.data;
};

export const useGetDailyContent = () => {
	return useQuery({
		queryKey: ["daily-content"],
		queryFn: () => getDailyContent(),
	});
};
