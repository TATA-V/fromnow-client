import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface UseRefresh {
  queryKey: string[];
  isNotice?: boolean;
}

const useRefresh = ({ queryKey, isNotice }: UseRefresh) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey });
    setRefreshing(false);
  }, []);

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefresh;
