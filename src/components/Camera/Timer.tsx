import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AlarmIcon from '@assets/icons/AlarmIcon';
import moment from 'moment-modification-rn';
import useNavi from '@hooks/useNavi';
import useToast from '@hooks/useToast';
import { useModal } from '@components/Modal';
import { cameraAccessible } from '@utils/cameraAccessible';
import { cn } from '@utils/cn';

const Timer = () => {
  const currentMinutes = moment().minute();
  const currentMilliseconds = currentMinutes * 60 * 1000;
  // const totalDuration = moment.duration(300000 - currentMilliseconds, 'milliseconds');
  const totalDuration = moment.duration(300000, 'milliseconds');
  const [time, setTime] = useState(totalDuration);
  const { navigation } = useNavi();
  const { warnToast } = useToast();
  const { hideModal } = useModal();
  const { accessible } = cameraAccessible();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    // if (!accessible) return;
    interval = setInterval(() => {
      setTime(prev => {
        const newTime = prev.clone().subtract(1, 'seconds');
        if (newTime.asSeconds() <= 0) {
          clearInterval(interval!);
          hideModal();
          navigation.navigate('Home');
          warnToast('⏰ 시간이 다 되었어요', { duration: 5000 });
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

  const progressPercentage = Math.max(0, Math.min(100, (1 - time.asMilliseconds() / totalDuration.asMilliseconds()) * 100));
  const formattedTime = formatTime(time.asSeconds());
  const shouldAnimate = time.asMinutes() <= 1;

  return (
    <View className="h-[68px] w-full justify-center px-4">
      <View className="relative h-[20px] rounded-[8px] bg-black/40">
        <View>
          <View
            style={{ width: `${100 - progressPercentage}%` }}
            className={cn(shouldAnimate ? 'bg-fnRed' : 'bg-white', 'h-full rounded-[8px] justify-center relative')}>
            <View
              className={cn(
                shouldAnimate ? 'bg-fnRed' : 'bg-white',
                'absolute top-[-8px] right-[-16px] rounded-[14px] w-[36px] h-[36px] flex justify-center items-center',
              )}>
              <AlarmIcon color={shouldAnimate ? '#fff' : '#1C1C1E'} />
            </View>
          </View>
        </View>
      </View>
      <Text className={cn(shouldAnimate ? 'text-white' : 'text-black900', 'text-sm font-PTDSemiBold pl-[6px] mt-2')}>{formattedTime}</Text>
    </View>
  );
};

export default Timer;
