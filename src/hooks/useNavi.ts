import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useNavi = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return {
    navigation,
  };
};

export default useNavi;
