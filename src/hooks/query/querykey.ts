import useUserStore from '@store/useUserStore';

export enum QUERY_KEY {
  MY = 'my',
  BOARD = 'board',
  FRIEND = 'friend',
  TEAM = 'team',
}

export const useKey = (queryKeys = []) => {
  const name = useUserStore(state => state.name);
  return [name, ...queryKeys];
};