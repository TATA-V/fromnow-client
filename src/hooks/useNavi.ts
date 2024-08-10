import { Platform } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useNavi = () => {
  const isWeb = Platform.OS === 'web';

  const navigate = isWeb ? useNavigate() : undefined;
  const navigation = isWeb ? undefined : useNavigation<NativeStackNavigationProp<any>>();

  return {
    navigate, // 웹
    navigation, // 앱
  };
};

export default useNavi;
