import { ENDPOINTS_DASHBOARD } from "@/features/dashboard/routes";
import axiosInstance from "@/lib/api/axios.config";
import { DASHBOARD_PILLAR_KEYS } from "@/shared/utils/query-keys";
import { useQuery } from "@tanstack/react-query";

const getPillarsDashboard = async () => {
	const response = await axiosInstance.get(ENDPOINTS_DASHBOARD.PILLAR);
	return response.data.data;
};

export const useGetPillarsDashboard = () => {
	return useQuery({
		queryKey: [DASHBOARD_PILLAR_KEYS],
		queryFn: () => getPillarsDashboard(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 1,
		retryDelay: 1000,
		enabled: true,
	});
};
