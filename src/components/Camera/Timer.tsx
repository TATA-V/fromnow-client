import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AlarmIcon from '@assets/icons/alarm.svg';
import moment from 'moment-modification-rn';
import useNavi from '@hooks/useNavi';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import MissionModal from '@components/Camera/MissionModal';
import mossionPng from '@assets/png/mission.png';
import useToast from '@hooks/useToast';

const Timer = () => {
  const totalDuration = moment.duration(1, 'minutes');
  const [time, setTime] = useState(totalDuration);
  const [openMissionModal, setOpenMissionModal] = useState(true);
  const { navigation } = useNavi();
  const { warnToast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!openMissionModal) {
      setTime(totalDuration);
      interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev.clone().subtract(1, 'seconds');
          if (newTime.asSeconds() <= 0) {
            clearInterval(interval!);
            navigation.navigate('Bottom', { screen: 'Home' });
            warnToast('⏰시간이 다 되었어요! 다시 촬영해보세요', { duration: 5000 });
            return moment.duration(0);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [openMissionModal]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progressPercentage = (1 - time.asMilliseconds() / totalDuration.asMilliseconds()) * 100;
  const formattedTime = formatTime(time.asSeconds());
  const shouldAnimate = time.asMinutes() === 1;

  return (
    <>
      <View className="px-4 mb-[24px]">
        <View className="relative h-[20px] rounded-[8px] bg-black200">
          <View
            style={{ width: `${progressPercentage + 7}%` }}
            className="absolute top-0 left-0 bg-[#F04438] h-[20px] rounded-[8px] justify-center pl-[6px]">
            <Text className="text-white text-sm font-PTDSemiBold">{formattedTime}</Text>
          </View>
          {shouldAnimate ? (
            <MotiView
              style={{ left: `${progressPercentage}%` }}
              className="absolute h-full justify-center"
              from={{ rotate: '-20deg' }}
              animate={{ rotate: '20deg' }}
              transition={{
                type: 'timing',
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                loop: true,
                repeatReverse: true,
              }}>
              <View className="bg-[#F04438] rounded-[14px] w-[36px] h-[36px] flex justify-center items-center">
                <View className="bg-[#F04438] rounded-[14px] w-[36px] h-[36px] flex justify-center items-center">
                  <AlarmIcon />
                </View>
              </View>
            </MotiView>
          ) : (
            <MotiView
              from={{ left: '0%' }}
              animate={{ left: `${progressPercentage}%` }}
              transition={{
                type: 'timing',
                duration: 500,
              }}
              className="absolute h-full justify-center">
              <View className="bg-[#F04438] rounded-[14px] w-[36px] h-[36px] flex justify-center items-center">
                <AlarmIcon />
              </View>
            </MotiView>
          )}
        </View>
      </View>
      <MissionModal
        open={openMissionModal}
        setOpen={setOpenMissionModal}
        title="오늘의 미션!"
        description="브이 포즈를 하고 셀카를 찍어보세요"
        confirm={() => setTime(totalDuration)}
        missionImg={mossionPng}
      />
    </>
  );
};

export default Timer;
