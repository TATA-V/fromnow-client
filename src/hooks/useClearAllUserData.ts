import { useQueryClient } from '@tanstack/react-query';
import useUserStore from '@store/useUserStore';
import { removeStorageAll } from '@utils/storage';

const useClearAllUserData = () => {
  const userReset = useUserStore(state => state.reset);
  const queryClient = useQueryClient();

  const removeAll = async () => {
    await queryClient.invalidateQueries();
    await removeStorageAll();
    userReset();
  };

  return removeAll;
};

export default useClearAllUserData;
