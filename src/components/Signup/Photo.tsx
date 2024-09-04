import { View, TouchableOpacity, Image, Pressable, Text } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import AvatarHappy from '@assets/icons/avatarHappy.svg';
import CameraIcon from '@assets/icons/camera.svg';

interface Props {
  image: ImageType;
  setImage: Dispatch<SetStateAction<ImageType>>;
}

const Photo = ({ image, setImage }: Props) => {
  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(item => {
      setImage(item);
    });
  };

  return (
    <View className="relative border-[1px] border-black200 rounded-[60px] w-[200px] h-[200px] flex justify-center items-center">
      {!image && (
        <View className="absolute top-0 w-full h-full flex justify-center items-center rounded-[60px] bg-black100">
          <AvatarHappy />
        </View>
      )}
      {image && <Image source={{ uri: image.path }} className="w-full h-full object-cover rounded-[60px]" />}
      <TouchableOpacity
        onPress={pickImage}
        className="absolute -bottom-[10.5] -right-[10.5] bg-black900 w-[56px] h-[56px] flex justify-center items-center rounded-[20px]">
        <CameraIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Photo;
