import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isWeb } from '@utils/deviceInfo';

const useNavi = () => {
  const navigation = isWeb ? undefined : useNavigation<NativeStackNavigationProp<any>>();

  return {
    navigation,
  };
};

export default useNavi;
