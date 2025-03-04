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
import { useGetAllTeam, useGetMission } from '@hooks/query';
import { formatDate } from '@utils/formatDate';
import { useTranslation } from 'react-i18next';
import moment from 'moment-modification-rn';

const CameraScreen = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isTimer, setIsTimer] = useState(true);
  const cameraRef = useRef<Camera | null>(null);
  const { navigation } = useNavi();
  const { showModal } = useModal();
  const { warnToast } = useToast();
  const { accessible } = cameraAccessible();
  const { t } = useTranslation();

  const { data: mission, isLoading } = useGetMission(formatDate());

  const toggleCameraType = () => setIsFrontCamera(!isFrontCamera);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const { uri } = await cameraRef.current.capture();

    ImageCropPicker.openCropper({
      path: uri,
      mediaType: 'photo',
      compressImageMaxWidth: 4000,
      compressImageMaxHeight: 4000,
      compressImageQuality: 0.8,
    }).then(image => {
      setIsTimer(false);
      navigation.navigate('BoardEdit', { file: image });
    });
  };

  useEffect(() => {
    // accessible && isTimer && showModal({ type: 'mission', title: mission[0]?.title, description: mission[0]?.content, missionImg: mission[0]?.missionImg, lockBackdrop: true });
    isTimer &&
      mission &&
      showModal({
        type: 'mission',
        title: mission[0]?.title || '',
        description: mission[0]?.content || '',
        missionImg: mission[0]?.missionImg || null,
        lockBackdrop: true,
      });
  }, [isTimer, mission]);

  const { data: teamList } = useGetAllTeam();
  useEffect(() => {
    if (teamList && teamList.length === 0) {
      navigation.navigate('Bottom', { screen: 'Home' });
      showModal({
        type: 'confirm',
        title: `${t('camera.createTeamTitle')}`,
        description: `${t('camera.createTeamDesc')}`,
        confirm: () => navigation.navigate('TeamCreate'),
      });
      return;
    }
    // if (accessible) return;
    // warnToast(`${t('camera.restrictedAccess')}`);
    // navigation.navigate('Home');
  }, []);

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
