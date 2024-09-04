import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PlusIcon from '@assets/icons/PlusIcon';
import Badge from '@components/common/Badge';
import { Team } from '@screens/HomeScreen';
import useNavi from '@hooks/useNavi';

export type Color = 'pink' | 'yellow' | 'blue' | 'green' | 'gray';

interface Props extends Team {
  isNew?: boolean;
  color: string;
}

const TeamFolder = ({ isNew, color, id, title, users }: Props) => {
  const [colors, setColors] = useState<string[]>([]);
  const { navigation } = useNavi();

  useEffect(() => {
    let temp: string[];
    switch (color) {
      case 'pink':
        temp = ['#FFEEEE', '#FEC7C6'];
        break;
      case 'yellow':
        temp = ['#FFF8DB', '#FEE987'];
        break;
      case 'blue':
        temp = ['#DDEAF7', '#8EB9E6'];
        break;
      case 'green':
        temp = ['#E7F5EC', '#B0DDC1'];
        break;
      case 'gray':
        temp = ['#F3F3F8', '#B3B4B9'];
        break;
      default:
        temp = ['#FFF8DB', '#FEE987'];
    }
    setColors(temp);
  }, [color]);

  return (
    <Pressable onPress={() => navigation.navigate('Team', { id })} className="relative">
      <Svg width={162} height={162} viewBox="0 0 162 162" fill="none">
        <Path
          fill={colors[0]}
          stroke={colors[1]}
          d="M2 41.105c0-6.976 0-10.46.553-13.367A31.6 31.6 0 0 1 27.73 2.553C30.645 2 34.137 2 41.105 2c3.05 0 4.582 0 6.051.134a31.6 31.6 0 0 1 17.222 7.142c1.138.94 2.212 2.014 4.377 4.179L73.1 17.8c6.446 6.446 9.67 9.67 13.525 11.81a31.598 31.598 0 0 0 6.699 2.781c4.25 1.209 8.808 1.209 17.917 1.209h2.955c20.793 0 31.197 0 37.951 6.083a20.013 20.013 0 0 1 1.77 1.77C160 48.207 160 58.61 160 79.404V96.8c0 29.791 0 44.69-9.259 53.941-9.259 9.251-24.15 9.259-53.941 9.259H65.2c-29.79 0-44.69 0-53.941-9.259C2.008 141.482 2 126.591 2 96.8V41.105Z"
        />
        <Path
          fill={colors[1]}
          d="M144 35c0-2.3-.039-3.667-.197-4.864-.682-5.055-3.048-9.748-6.733-13.352-3.685-3.604-8.483-5.918-13.649-6.583-1.538-.201-3.369-.201-7.038-.201H65c.915.803 1.949 1.807 3.645 3.474l4.34 4.247c6.439 6.3 9.658 9.45 13.509 11.542a31.95 31.95 0 0 0 6.699 2.718c4.237 1.181 8.79 1.181 17.896 1.181h2.943c14.045 0 23.332 0 29.968 1.838Z"
        />
      </Svg>
      <View className="absolute top-[54px] w-full h-full items-center">
        <View className="flex flex-row">
          {users.slice(0, 2).map((img, idx) => (
            <Image
              key={idx}
              source={img}
              className={`${idx === 0 ? 'ml-0' : 'ml-[-12px]'} w-[48px] h-[48px] rounded-2xl border-[1px] border-black200`}
            />
          ))}
          <View className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200 flex flex-row bg-white justify-center items-center ml-[-12px]">
            <PlusIcon size={18} color="#B3B4B9" />
            <Text className="text-black500 font-PTDLight text-[20px]">{users.length - 2}</Text>
          </View>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" className="max-w-[130px] font-UhBee text-[20px] mt-4">
          {title}
        </Text>
      </View>
      {isNew && (
        <View className="absolute top-0 left-0">
          <Badge />
        </View>
      )}
    </Pressable>
  );
};

export default TeamFolder;
