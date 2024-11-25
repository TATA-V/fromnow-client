import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useUpdatePhoto } from '@hooks/query';
import { isIOS } from '@utils/deviceInfo';
import { androidPermission, iosPermission } from '@const/permissions';
import { checkPremission } from '@utils/checkPermissions';

interface Props {
  photoUrl: string;
}

const MyPhoto = ({ photoUrl }: Props) => {
  const { updatePhotoMutation } = useUpdatePhoto();

  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(item => {
      const permission = isIOS ? iosPermission.PHOTO : androidPermission.PHOTO;
      checkPremission({ permission, target: '앨범', onGranted: () => updatePhotoMutation.mutate(item) });
    });
  };

  return (
    <TouchableOpacity onPress={pickImage} className="rounded-[56px] border-[1px] border-black200 overflow-hidden">
      <Image source={{ uri: photoUrl }} className="w-[160px] h-[160px]" />
    </TouchableOpacity>
  );
};

export default MyPhoto;
