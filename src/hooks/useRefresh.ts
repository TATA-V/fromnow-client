import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useRefresh = ({ queryKey }: { queryKey: string[] }) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey });
    setRefreshing(false);
  }, []);

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefresh;
