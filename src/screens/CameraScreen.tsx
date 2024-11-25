import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import CameraBtn from '@assets/icons/CameraBtn';
import CameraHeader from '@components/Camera/CameraHeader';
import Timer from '@components/Camera/Timer';
import ImageCropPicker from 'react-native-image-crop-picker';
import useNavi from '@hooks/useNavi';
import { useModal } from '@components/Modal';
import { cameraAccessible } from '@utils/cameraAccessible';
import useToast from '@hooks/useToast';
import { useGetMission } from '@hooks/query';
import { formatDate } from '@utils/formatDate';

const CameraScreen = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isTimer, setIsTimer] = useState(true);
  const cameraRef = useRef<Camera | null>(null);
  const { navigation } = useNavi();
  const { showModal } = useModal();
  const { warnToast } = useToast();
  const { accessible } = cameraAccessible();

  const { data: missionData, isLoading } = useGetMission(formatDate());
  console.log(missionData);
  // const mission = missionData[0];

  const toggleCameraType = () => setIsFrontCamera(!isFrontCamera);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const { uri } = await cameraRef.current.capture();

    ImageCropPicker.openCropper({
      path: uri,
      mediaType: 'photo',
    }).then(image => {
      setIsTimer(false);
      navigation.navigate('BoardEdit', { file: image });
    });
  };

  useEffect(() => {
    // accessible && isTimer && showModal({ type: 'mission', title: mission.title, description: mission.content, missionImg: mission.missionImg || '' });
    // isTimer && showModal({ type: 'mission', title: mission.title, description: mission.content, missionImg: mission.missionImg || '' });
  }, [isTimer]);

  // useEffect(() => {
  //   if (accessible) return;
  //   warnToast('지정된 시간에만 카메라에 접근할 수 있어요.');
  //   navigation.navigate('Home');
  // }, []);

  return (
    <>
      <Camera
        ref={cameraRef}
        className="absolute top-0 w-full h-full"
        cameraType={isFrontCamera ? CameraType.Front : CameraType.Back}
        flashMode="auto"
      />
      {isTimer && (
        <View className="relative pt-[66px]">
          <Timer />
        </View>
      )}
      <View className="absolute bottom-[26.5px] w-full items-center pt-[26.5px]">
        <TouchableOpacity onPress={takePicture}>
          <CameraBtn />
        </TouchableOpacity>
      </View>
      <CameraHeader toggleCameraType={toggleCameraType} />
    </>
  );
};

export default CameraScreen;
