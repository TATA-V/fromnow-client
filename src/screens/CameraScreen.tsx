import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import CameraBtn from '@assets/icons/CameraBtn';
import CameraHeader from '@components/Camera/CameraHeader';
import Timer from '@components/Camera/Timer';

const CameraScreen = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isTimer, setIsTimer] = useState(true);
  const cameraRef = useRef<Camera | null>(null);

  const toggleCameraType = () => setIsFrontCamera(!isFrontCamera);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const { uri } = await cameraRef.current.capture();
    console.log('uri:', uri);
  };

  return (
    <>
      <CameraHeader toggleCameraType={toggleCameraType} />
      {isTimer && <View className="absolute w-full h-full flex-1 bg-black/70" pointerEvents="box-none" />}
      <View className="relative flex-1 justify-center pt-[66px]">
        {isTimer && <Timer />}
        <View className="w-full h-[500px] rounded-[28px] overflow-hidden">
          <Camera
            ref={cameraRef}
            cameraType={isFrontCamera ? CameraType.Front : CameraType.Back} // 후면 카메라 사용
            flashMode="auto"
            className="w-full h-[500px]"
          />
        </View>
        <View className="items-center pt-[26.5px]">
          <TouchableOpacity onPress={takePicture}>
            <CameraBtn color={isTimer ? '#fff' : '#8EB9E6'} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CameraScreen;
