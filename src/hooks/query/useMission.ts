import { Moment } from 'moment-modification-rn';
import { QUERY_KEY, useKey } from '@hooks/query';
import { getOne } from '@api/mission';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@utils/formatDate';
import { Mission } from '@clientTypes/mission';

export const useGetMission = (dateString: string | Moment) => {
  const date = formatDate(dateString);
  const queryKey = useKey([date, QUERY_KEY.MISSION]);
  const { data, isError, isLoading } = useQuery<Mission[]>({
    queryKey,
    queryFn: async () => await getOne(date),
  });

  return { data, isError, isLoading };
};
