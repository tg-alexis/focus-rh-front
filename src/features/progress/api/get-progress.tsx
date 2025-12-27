import axiosInstance from "@/lib/api/axios.config";
import { DASHBOARD_STATS_KEYS } from "@/shared/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_DASHBOARD } from "../routes";

const getStatsDashboard = async () => {
	const response = await axiosInstance.get(ENDPOINTS_DASHBOARD.STATS);
	return response.data.data;
};

export const useGetStatsDashboard = () => {
	return useQuery({
		queryKey: [DASHBOARD_STATS_KEYS],
		queryFn: () => getStatsDashboard(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 1,
		retryDelay: 1000,
		enabled: true,
	});
};
