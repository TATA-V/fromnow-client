import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, LayoutChangeEvent } from 'react-native';
import bottomTabBg from '@assets/png/bottom-tab-bg.png';
import CameraIcon from '@assets/icons/CameraIcon';
import HomeIcon from '@assets/icons/HomeIcon';
import PeopleIcon from '@assets/icons/PeopleIcon';
import TooltipTailIcon from '@assets/icons/tooltip-tail.svg';
import { AnimatePresence, MotiView } from 'moti';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY, useGetAllTeam, useKey } from '@hooks/query';
import { Team } from '@clientTypes/team';
import { useModal } from '@components/Modal';
import { cameraAccessible } from '@utils/cameraAccessible';
import { androidPermission, iosPermission } from '@const/permissions';
import { isIOS } from '@utils/deviceInfo';
import { checkPremission } from '@utils/checkPermissions';
import useDeviceSize from '@hooks/useDeviceSize';
import { useTranslation } from 'react-i18next';

const BottomTabBar = ({ state, descriptors, navigation }: any) => {
  // const [showBubble, setShowBubble] = useState(true);
  // 말풍선은 새로운 일상이 생겼을 때 + 내가 글을 작성하지 않았을 때만 뜬다.
  const { width, isTablet } = useDeviceSize();
  const styles = createStyles(width, isTablet);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const { accessible } = cameraAccessible();

  const { data: teamList } = useGetAllTeam();

  const navigateToScreen = (target: string) => {
    navigation.navigate(target);
  };

  const clickCamera = async () => {
    if (teamList && teamList.length === 0) {
      showModal({
        type: 'confirm',
        title: '모임 생성',
        description: '아직 생성된 모임이 없어요.\n지금 바로 새로운 모임을 만들어 보세요!',
        confirm: () => navigation.navigate('TeamCreate'),
      });
      return;
    }

    // if (!accessible) {
    //   showModal({
    //     type: 'confirm',
    //     title: '⚠️ 카메라 접근 불가 ⚠️',
    //     description: '오후 3시부터 3시 5분 사이에만\n카메라에 접근할 수 있어요.',
    //   });
    //   return;
    // }

    const permission = isIOS ? iosPermission.CAMERA : androidPermission.CAMERA;
    await checkPremission({ permission, target: '카메라', onGranted: () => navigation.navigate('Camera') });
  };

  return (
    <View className="absolute bottom-[-3.5px] w-full bg-transparent" pointerEvents="box-none">
      <Image source={bottomTabBg} className="w-full h-[110px]" resizeMode="cover" />
      {/* <View className="relative bg-pink-400"> */}
      <View style={styles.home} className="absolute">
        <TouchableOpacity onPress={() => navigateToScreen('Home')} className="items-center py-2 px-5">
          <HomeIcon color={state.routes[state.index].name === 'Home' ? '#1C1C1E' : '#D9D9DC'} />
          <Text className="text-black900 font-PTDLight text-[12px] mt-[4px]">{t('base.home')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profile} className="absolute">
        <TouchableOpacity onPress={() => navigateToScreen('Profile')} className="items-center py-2 px-5">
          <PeopleIcon color={state.routes[state.index].name === 'Profile' ? '#1C1C1E' : '#D9D9DC'} />
          <Text className="text-black900 font-PTDLight text-[12px] mt-[4px]">{t('base.profile')}</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      <View style={styles.camera} className="absolute h-full justify-center">
        <TouchableOpacity onPress={clickCamera} style={styles.button} className="rounded-full bg-black900 flex justify-center items-center">
          <CameraIcon width={width * 0.068} height={width * 0.068} />
        </TouchableOpacity>
      </View>
      {/* <AnimatePresence>
        {showBubble && (
          <MotiView
            from={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 5 }}
            transition={{
              type: 'timing',
              duration: 700,
              loop: true,
              repeatReverse: true,
            }}>
            <View style={styles.bubble} className="absolute" pointerEvents="none">
              <View className="rounded-2xl h-[38px] px-4 bg-black900 flex justify-center items-center">
                <Text className="text-white text-sm font-PTDLight">
                  지금 기록하면 <Text className="font-semibold">3개</Text>의 일상을 볼 수 있어요
                </Text>
              </View>
              <View className="w-full items-center translate-y-[-1px]">
                <TooltipTailIcon />
              </View>
            </View>
          </MotiView>
        )}
      </AnimatePresence> */}
    </View>
  );
};

export default BottomTabBar;

const createStyles = (width: number, isTablet: boolean) =>
  StyleSheet.create({
    button: {
      width: width * 0.14,
      height: width * 0.14,
    },
    home: {
      left: isTablet ? '17%' : '12%',
      bottom: isTablet ? 15 : 5,
    },
    profile: {
      right: isTablet ? '17%' : '12%',
      bottom: isTablet ? 15 : 5,
    },
    camera: {
      left: width / 2,
      transform: [{ translateX: -(width * 0.07) }],
      bottom: 9,
    },
    bubble: {
      width: '100%',
      bottom: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
