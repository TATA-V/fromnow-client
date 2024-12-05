import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface UseRefresh {
  queryKey: string[] | string[][];
}

const useRefresh = ({ queryKey }: UseRefresh) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (Array.isArray(queryKey[0])) {
      for (let key of queryKey as string[][]) {
        await queryClient.invalidateQueries({ queryKey: key });
        await queryClient.refetchQueries({ queryKey: key });
      }
    } else {
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });
    }

    setRefreshing(false);
  }, [queryClient, queryKey]);

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefresh;
