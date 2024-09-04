import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useNavi = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<any, any>>();

  return {
    navigation,
    route,
  };
};

export default useNavi;
