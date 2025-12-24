import axiosInstance from "@/lib/api/axios.config";
import { DAILY_CONTENT_KEYS } from "@/shared/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_DAILY_TASK } from "../routes";

const getDailyContent = async () => {
	const response = await axiosInstance.get(ENDPOINTS_DAILY_TASK.TODAY);
	return response.data.data;
};

export const useGetDailyContent = () => {
	return useQuery({
		queryKey: [DAILY_CONTENT_KEYS],
		queryFn: () => getDailyContent(),
	});
};
