import React from 'react';
import { View, Image } from 'react-native';
import postJpg from '@assets/jpg/post.jpg';
import postJpg2 from '@assets/jpg/post2.jpg';
import postJpg3 from '@assets/jpg/post3.jpg';

interface Props {
  imgs: string[];
}

const ImageCards = ({ imgs }: Props) => {
  const oneImg = imgs.length === 1;
  const twoImg = imgs.length === 2;
  const threeImg = imgs.slice(0, 3).length === 3;

  return (
    <View className="relative">
      {oneImg && <Image source={{ uri: imgs[0] }} className="mt-[5px] w-[33px] h-[44px] rounded-[8px]" resizeMode="cover" />}
      {twoImg && (
        <>
          <Image
            source={{ uri: imgs[0] }}
            className="mt-[5px] w-[33px] h-[44px] rounded-[8px] transfrom rotate-[-15deg] translate-x-[-2px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: imgs[1] }}
            className="absolute top-[10px] left-[2px] mt-[5px] w-[33px] h-[44px] rounded-[8px] transfrom rotate-[15deg]"
            resizeMode="cover"
          />
        </>
      )}
      {threeImg && (
        <>
          <Image
            source={{ uri: imgs[0] }}
            className="mt-[5px] w-[33px] h-[44px] rounded-[8px] transfrom rotate-[-15deg] translate-x-[-2px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: imgs[1] }}
            className="absolute top-[5px] left-[2px] mt-[5px] w-[33px] h-[44px] rounded-[8px] transfrom rotate-[3deg]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: imgs[2] }}
            className="absolute top-[10px] left-[2px] mt-[5px] w-[33px] h-[44px] rounded-[8px] transfrom rotate-[15deg]"
            resizeMode="cover"
          />
        </>
      )}
    </View>
  );
};

export default ImageCards;
