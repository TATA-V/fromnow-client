import { RouteProp, useRoute } from '@react-navigation/native';
import { isWeb } from '@utils/deviceInfo';

const useCurrentRoute = () => {
  const route = isWeb ? undefined : useRoute<RouteProp<any>>();

  return {
    route,
  };
};

export default useCurrentRoute;
