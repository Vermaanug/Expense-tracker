import { useQuery } from "@tanstack/react-query";
import { CORE_KEYS } from "../KEYS/CORE_KEYS";
import { handleGlobalGetRequestQuery } from "../function/globalApifunction";
import { CORE_URLS } from "../URLS/CORE_URLS";

interface IGetServicePropsSchema {
  page?: string;
  per_page?: string;
  enableQuery?: boolean;
}

export interface ITranscationResponseSchema {
  _id: string
  type: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}

export const useTranscationServices = ({
  page = "1",
  per_page = "10",
  enableQuery = true,
}: IGetServicePropsSchema) => {
  const getAllTranscationService = useQuery({
    queryKey: [...CORE_KEYS?.TRANSCATION, page, per_page],
    queryFn: (): Promise<{ data: ITranscationResponseSchema[] }> =>
      handleGlobalGetRequestQuery({
        url: CORE_URLS.TRANSCATION,
      }),
    enabled: enableQuery,
  });

  return {
    services: { getAllTranscationService },
  };
};

export const useSingleTranscationServices = ({
  transcationId,
  enableQuery = true,
}: {
  transcationId: string;
  enableQuery: boolean;
}) => {
  const getSingleTranscationService = useQuery({
    queryKey: [...CORE_KEYS?.TRANSCATION, transcationId],
    queryFn: (): Promise<{ transaction: ITranscationResponseSchema }> =>
      handleGlobalGetRequestQuery({
        url: `${CORE_URLS.TRANSCATION}/${transcationId}`,
      }),
    enabled: enableQuery,
  });

  return {
    services: { getSingleTranscationService },
  };
};
