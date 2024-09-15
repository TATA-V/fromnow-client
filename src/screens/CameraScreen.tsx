import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import CameraBtn from '@assets/icons/CameraBtn';
import CameraHeader from '@components/Camera/CameraHeader';
import Timer from '@components/Camera/Timer';
import ImageCropPicker from 'react-native-image-crop-picker';
import useNavi from '@hooks/useNavi';
import MissionModal from '@components/Camera/MissionModal';
import missionPng from '@assets/png/mission.png';

const CameraScreen = () => {
  const [openMissionModal, setOpenMissionModal] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isTimer, setIsTimer] = useState(true);
  const cameraRef = useRef<Camera | null>(null);
  const { navigation } = useNavi();

  const toggleCameraType = () => setIsFrontCamera(!isFrontCamera);

  const takePicture = async () => {
    console.log('1');
    if (!cameraRef.current) return;
    const { uri } = await cameraRef.current.capture();
    console.log('2');

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
      <Camera
        ref={cameraRef}
        className="absolute top-0 w-full h-full"
        cameraType={isFrontCamera ? CameraType.Front : CameraType.Back}
        flashMode="auto"
      />
      <View className="relative pt-[66px]">{isTimer && <Timer />}</View>
      <View className="absolute bottom-[26.5px] w-full items-center pt-[26.5px]">
        <TouchableOpacity onPress={takePicture}>
          <CameraBtn />
        </TouchableOpacity>
      </View>
      <CameraHeader toggleCameraType={toggleCameraType} />
      <MissionModal
        open={openMissionModal}
        setOpen={setOpenMissionModal}
        title="오늘의 미션!"
        description="브이 포즈를 하고 셀카를 찍어보세요"
        missionImg={missionPng}
      />
    </>
  );
};

export default CameraScreen;
