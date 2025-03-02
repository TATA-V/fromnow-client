import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Logo from '@assets/icons/logo.svg';
import usePolicyStore from '@store/usePolicyStore';
import useClearAllUserData from '@hooks/useClearAllUserData';
import { getStorage, setStorage } from '@utils/storage';
import { checkPermissions } from '@utils/checkPermissions';
import { allPermissions } from '@const/permissions';
import { useModal } from '@components/Modal';
import { useTranslation } from 'react-i18next';

import GoogleSignInBtn from '@components/SignIn/GoogleSignInBtn';
import KakaoSignInBtn from '@components/SignIn/KakaoSignInBtn';
import PermissionInfo from '@components/SignIn/PermissionInfo';

const SignInScreen = () => {
  const { animated } = usePolicyStore(state => state);
  const clearAllUserData = useClearAllUserData();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    const setupLaunch = async () => {
      await clearAllUserData();
      await setStorage('isAutoSave', 'true');
      const firstLaunch = await getStorage('firstLaunch');
      if (firstLaunch) return;
      showModal({
        type: 'confirm',
        title: t('signin.permissionGuide'),
        confirm: async () => {
          await setStorage('firstLaunch', 'true');
          await checkPermissions(allPermissions);
        },
        lockBackdrop: true,
        children: <PermissionInfo />,
      });
    };
    setupLaunch();
  }, []);

  return (
    <>
      <View className="h-screen flex flex-col justify-between">
        <View className="w-full flex items-center pt-[120px]">
          <View className="w-[200px] h-[38px] mb-4">
            <Logo />
          </View>
          <Text className="font-UhBee text-[28px]">{t('signin.greeting')}</Text>
        </View>
      </View>
      {animated && (
        <View className="absolute bottom-[20px] px-4 w-full">
          <GoogleSignInBtn />
          <View className="mt-[12px]">
            <KakaoSignInBtn />
          </View>
        </View>
      )}
    </>
  );
};

export default SignInScreen;
