import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import { useUpdatePhoto } from '@hooks/query';

interface Props {
  photoUrl: string;
}

const MyPhoto = ({ photoUrl }: Props) => {
  const [image, setImage] = useState<ImageType>();
  const { updatePhotoMutation } = useUpdatePhoto();

  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(item => {
      setImage(item);
      updatePhotoMutation.mutate(item);
    });
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={{ uri: photoUrl }} className="w-[160px] h-[160px] rounded-[56px] border-[1px] border-black200" />
    </TouchableOpacity>
  );
};

export default MyPhoto;
