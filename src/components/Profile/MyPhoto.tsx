import React from 'react';
import { Image } from 'react-native';
import profilePng from '@assets/png/profile.png';

const MyPhoto = () => {
  return <Image source={profilePng} className="w-[160px] h-[160px] rounded-[56px] border-[1px] border-black200" />;
};

export default MyPhoto;
