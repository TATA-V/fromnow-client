import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';
import SplashLottie from '@components/Lottie/SplashLottie';
import BootSplash from 'react-native-bootsplash';
import useAppState from '@store/useAppStore';

const SplashScreen = () => {
  const [showLottie, setShowLottie] = useState(true);
  const setIsFirstEntry = useAppState(state => state.setIsFirstEntry);

  useEffect(() => {
    const hideBootSplash = async () => {
      const promise = new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 2500);
      });
      await BootSplash.hide({ fade: true });
      await promise;
      setShowLottie(false);
      setIsFirstEntry(false);
    };

    hideBootSplash();
  }, []);

  return (
    <View className="flex-1 bg-black900">
      <AnimatePresence>
        {showLottie && (
          <MotiView
            style={[StyleSheet.absoluteFill]}
            className="flex justify-center items-center"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 400 }}>
            <SplashLottie customStyle={{ height: 500, width: '100%' }} />
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

export default SplashScreen;
