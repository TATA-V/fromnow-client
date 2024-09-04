import { RouteProp, useRoute } from '@react-navigation/native';

const useCurrentRoute = () => {
  const route = useRoute<RouteProp<any, any>>();
  return {
    route,
  };
};

export default useCurrentRoute;
