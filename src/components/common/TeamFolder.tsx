import React, { useMemo } from 'react';
import { Text, View, Image, Pressable, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PlusIcon from '@assets/icons/PlusIcon';
import Badge from '@components/common/Badge';
import useNavi from '@hooks/useNavi';
import { Team } from '@clientTypes/team';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import { isTablet } from '@utils/deviceInfo';

export type Color = 'pink' | 'yellow' | 'blue' | 'green' | 'gray';

interface Props extends Team {
  color: string;
}

const { width } = Dimensions.get('window');

const TeamFolder = ({ isNew, color, id, createdAt, recivedAt, title, photoUrls = [] }: Props) => {
  const { setTeam } = useSelectedTeamStore();
  const { navigation } = useNavi();
  const numColumns = isTablet ? 4 : 2;
  const teamFolderSize = (width - 18 - 32) / numColumns;
  const badgeSize = teamFolderSize / 4.5;
  const imageSize = teamFolderSize / 3.375;
  const fontSize = teamFolderSize / 8.1;
  const plusIconSize = teamFolderSize / 9;
  const titleMathWidth = teamFolderSize - 32;

  const colors = useMemo(() => {
    switch (color) {
      case 'pink':
        return ['#FFEEEE', '#FEC7C6'];
      case 'yellow':
        return ['#FFF8DB', '#FEE987'];
      case 'blue':
        return ['#DDEAF7', '#8EB9E6'];
      case 'green':
        return ['#E7F5EC', '#B0DDC1'];
      case 'gray':
        return ['#F3F3F8', '#B3B4B9'];
      default:
        return ['#FFF8DB', '#FEE987'];
    }
  }, [color]);

  const clickTeam = () => {
    navigation.navigate('Team', { id });
    setTeam({ id, title, createdAt, recivedAt });
  };

  return (
    <Pressable onPress={clickTeam}>
      <View className="relative">
        <Svg width={teamFolderSize} height={teamFolderSize} viewBox="0 0 162 162" fill="none">
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
        <View className="absolute w-full h-full items-center justify-center top-[9.5%]">
          <View className="flex flex-row">
            {Array.isArray(photoUrls) &&
              photoUrls
                .slice(0, 2)
                .map((img, idx) => (
                  <Image
                    style={{ width: imageSize, height: imageSize, marginLeft: idx === 0 ? 0 : -(imageSize / 4) }}
                    key={idx}
                    source={{ uri: img }}
                    className="rounded-2xl border-[1px] border-black200"
                  />
                ))}
            {photoUrls.length > 2 && (
              <View className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200 flex flex-row bg-white justify-center items-center ml-[-12px]">
                <PlusIcon size={plusIconSize} color="#B3B4B9" />
                <Text style={{ fontSize: fontSize }} className="text-black500 font-PTDLight">
                  {photoUrls.length - 2}
                </Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: fontSize, maxWidth: titleMathWidth }} numberOfLines={1} ellipsizeMode="tail" className="font-UhBee mt-4">
            {title}
          </Text>
        </View>
        {isNew && (
          <View className="absolute top-0 left-0">
            <Badge width={badgeSize} height={badgeSize} bgColor="#F04438" color="#fff" />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default TeamFolder;
