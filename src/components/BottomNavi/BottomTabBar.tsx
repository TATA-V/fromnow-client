import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import bottomTabBg from '@assets/png/bottom-tab-bg.png';
import CameraIcon from '@assets/icons/CameraIcon';
import HomeIcon from '@assets/icons/HomeIcon';
import PeopleIcon from '@assets/icons/PeopleIcon';
import TooltipTailIcon from '@assets/icons/tooltip-tail.svg';
import { AnimatePresence, MotiView } from 'moti';

const { width } = Dimensions.get('window');

const BottomTabBar = ({ state, descriptors, navigation }: any) => {
  const [showBubble, setShowBubble] = useState(true);
  // 말풍선은 새로운 일상이 생겼을 때 + 내가 글을 작성하지 않았을 때만 뜬다.

  const navigateToScreen = (target: string) => {
    navigation.navigate(target);
  };

  return (
    <View className="absolute bottom-0 w-full bg-transparent" pointerEvents="box-none">
      <Image source={bottomTabBg} className="w-full h-[110px]" resizeMode="cover" />
      <View style={styles.home} className="absolute h-full justify-center">
        <TouchableOpacity onPress={() => navigateToScreen('Home')} className="items-center">
          <HomeIcon color={state.routes[state.index].name === 'Home' ? '#1C1C1E' : '#D9D9DC'} />
          <Text className="text-black900 font-PTDLight text-[12px] mt-[4px]">홈</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profile} className="absolute h-full justify-center">
        <TouchableOpacity onPress={() => navigateToScreen('Profile')} className="items-center">
          <PeopleIcon color={state.routes[state.index].name === 'Profile' ? '#1C1C1E' : '#D9D9DC'} />
          <Text className="text-black900 font-PTDLight text-[12px] mt-[4px]">홈</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.camera} className="absolute h-full justify-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          style={styles.button}
          className={`rounded-full bg-black900 flex justify-center items-center`}>
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

const styles = StyleSheet.create({
  button: {
    width: width * 0.14,
    height: width * 0.14,
  },
  home: {
    left: width / 5.6,
    top: width * 0.044,
  },
  profile: {
    right: width / 5.6,
    top: width * 0.044,
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
