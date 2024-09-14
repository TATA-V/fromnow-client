import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import CameraBtn from '@assets/icons/CameraBtn';
import CameraHeader from '@components/Camera/CameraHeader';
import Timer from '@components/Camera/Timer';
import ImageCropPicker from 'react-native-image-crop-picker';
import useNavi from '@hooks/useNavi';

const CameraScreen = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const { navigation } = useNavi();

  const toggleCameraType = () => setIsFrontCamera(!isFrontCamera);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const { uri } = await cameraRef.current.capture();

    ImageCropPicker.openCropper({
      path: uri,
      mediaType: 'photo',
    }).then(image => {
      console.log('Edited image:', image);
      navigation.navigate('PostEdit', { file: image });
    });
  };

  return (
    <>
      <CameraHeader toggleCameraType={toggleCameraType} />
      <View className="absolute w-full h-full flex-1 bg-black/70" pointerEvents="box-none" />
      <View className="relative flex-1 justify-center pt-[66px]">
        {isTimer && <Timer />}
        <View className="w-full h-[500px] rounded-[28px] overflow-hidden">
          <Camera ref={cameraRef} cameraType={isFrontCamera ? CameraType.Front : CameraType.Back} flashMode="auto" className="w-full h-[500px]" />
        </View>
        <View className="items-center pt-[26.5px]">
          <TouchableOpacity onPress={takePicture}>
            <CameraBtn />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CameraScreen;
