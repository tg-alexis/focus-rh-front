import axiosInstance from "@/lib/api/axios.config";
import { DASHBOARD_BADGES_KEYS } from "@/shared/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_DASHBOARD } from "../routes";

const getAchievementsDashboard = async () => {
	const response = await axiosInstance.get(ENDPOINTS_DASHBOARD.BADGES);
	return response.data.data;
};

export const useGetAchievementsDashboard = () => {
	return useQuery({
		queryKey: [DASHBOARD_BADGES_KEYS],
		queryFn: () => getAchievementsDashboard(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 1,
		retryDelay: 1000,
		enabled: true,
	});
};
