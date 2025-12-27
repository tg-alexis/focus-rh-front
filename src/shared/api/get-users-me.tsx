import axiosInstance from "@/lib/api/axios.config";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_SHARED } from "../routes";
import { USER_ME_KEYS } from "../utils/query-keys";

const getUserMe = async () => {
	const response = await axiosInstance.get(ENDPOINTS_SHARED.USER);
	return response.data.data;
};

export const useGetUserMe = () => {
	return useQuery({
		queryKey: [USER_ME_KEYS],
		queryFn: () => getUserMe(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 1,
		retryDelay: 1000,
		enabled: true,
	});
};
