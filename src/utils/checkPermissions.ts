import { Alert, Linking } from 'react-native';
import { check, checkMultiple, openSettings, Permission, request, requestMultiple, RESULTS } from 'react-native-permissions';
import { isAndroid, isIOS } from '@utils/deviceInfo';

interface CheckPremission {
  permission: Permission;
  target: string;
  onGranted: () => void;
}

export const checkPermissions = async (permissions: Permission[]) => {
  const statuses = await checkMultiple(permissions);
  const permissionsToRequest = permissions.filter(permission => statuses[permission] !== RESULTS.GRANTED);
  if (permissionsToRequest.length > 0) {
    const requestStatuses = await requestMultiple(permissionsToRequest);
    const allGrantedAfterRequest = permissions.every(permission => requestStatuses[permission] === RESULTS.GRANTED);
    return allGrantedAfterRequest;
  } else {
    return true;
  }
};

export const checkPremission = async ({ permission, target, onGranted }: CheckPremission) => {
  const status = await check(permission);
  if (status === RESULTS.GRANTED) {
    onGranted();
    return;
  }
  if (status === RESULTS.DENIED) {
    const requestStatus = await request(permission);
    if (requestStatus === RESULTS.GRANTED) {
      onGranted();
      return;
    } else {
      if (isIOS) {
        Alert.alert('권한 거부', `${target} 권한이 거부되었습니다. 설정에서 권한을 변경해주세요.`, [
          { text: '설정으로 가기', onPress: () => Linking.openSettings() },
          { text: '취소', style: 'cancel' },
        ]);
      }
      if (isAndroid) {
        Alert.alert('권한 거부', `${target} 권한이 거부되었습니다. 설정에서 권한을 변경해주세요.`, [
          { text: '설정으로 가기', onPress: () => openSettings() },
          { text: '취소', style: 'cancel' },
        ]);
      }
    }
  }
  if (status === RESULTS.BLOCKED) {
    if (isIOS) {
      Alert.alert('권한 차단됨', `${target} 권한이 차단되었습니다. 설정에서 권한을 변경해주세요.`, [
        { text: '설정으로 가기', onPress: () => Linking.openSettings() },
        { text: '취소', style: 'cancel' },
      ]);
    }
    if (isAndroid) {
      Alert.alert('권한 차단됨', `${target} 권한이 차단되었습니다. 설정에서 권한을 변경해주세요.`, [
        { text: '설정으로 가기', onPress: () => openSettings() },
        { text: '취소', style: 'cancel' },
      ]);
    }
  }

  return {
    status,
  };
};
