import axiosInstance from "@/lib/api/axios.config";
import { JOURNEY_STRUCTURE_KEYS } from "@/shared/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS_JOURNEY } from "../routes";

const getJourneyStructure = async () => {
	const response = await axiosInstance.get(ENDPOINTS_JOURNEY.JOURNEY_STRUCTURE);
	return response.data;
};

export const useGetJourneyStructure = () => {
	return useQuery({
		queryKey: [JOURNEY_STRUCTURE_KEYS],
		queryFn: () => getJourneyStructure(),
	});
};
