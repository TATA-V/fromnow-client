import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AlarmIcon from '@assets/icons/AlarmIcon';
import moment from 'moment-modification-rn';
import useNavi from '@hooks/useNavi';
import { MotiView } from 'moti';
import useToast from '@hooks/useToast';

const Timer = () => {
  const totalDuration = moment.duration(5, 'minutes');
  const [time, setTime] = useState(totalDuration);
  const { navigation } = useNavi();
  const { warnToast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
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

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progressPercentage = (1 - time.asMilliseconds() / totalDuration.asMilliseconds()) * 100;
  const formattedTime = formatTime(time.asSeconds());
  const shouldAnimate = time.asMinutes() <= 1;

  return (
    <View className="h-[68px] w-full justify-center px-4">
      <View className="relative h-[20px] rounded-[8px] bg-black/40">
        <View>
          <View
            style={{ width: `${100 - progressPercentage}%` }}
            className={`${shouldAnimate ? 'bg-fnRed' : 'bg-white'} absolute top-0 left-0 h-[20px] rounded-[8px] justify-center`}
          />
          <Text className={`${shouldAnimate ? 'text-white' : 'text-black900'} absolute left-0 text-sm font-PTDSemiBold pl-[6px]`}>
            {formattedTime}
          </Text>
        </View>
        <MotiView
          animate={{ right: `${progressPercentage - 3}%` }}
          transition={{
            type: 'timing',
            duration: 500,
          }}
          className="absolute h-full justify-center">
          <View className={`${shouldAnimate ? 'bg-fnRed' : 'bg-white'} rounded-[14px] w-[36px] h-[36px] flex justify-center items-center`}>
            <AlarmIcon color={shouldAnimate ? '#fff' : '#1C1C1E'} />
          </View>
        </MotiView>
      </View>
    </View>
  );
};

export default Timer;
