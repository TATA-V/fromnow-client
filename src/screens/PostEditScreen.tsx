import React, { useState } from 'react';
import { View, Image, TextInput, Text, Alert } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { SheetManager } from 'react-native-actions-sheet';
import Button from '@components/common/Button';

interface Props {
  paramName: string;
}

const PostEditScreen = ({}: Props) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { route } = useCurrentRoute();
  console.log('file:', route.params.file);

  const changeContent = (text: string) => {
    if (text.length <= 500) {
      setContent(text);
    } else {
      Alert.alert('경고', '글자 수가 500자를 초과했습니다.');
    }
  };

  const selectTeamToShow = () => {
    SheetManager.show('select-team');
  };

  return (
    <>
      <View className="px-4">
        <Image source={{ uri: route.params.file.path }} resizeMode="cover" className="w-[72px] h-[97px] rounded-[12px]" />
        <View className="relative pt-4 pb-[300px]">
          <TextInput
            multiline
            autoFocus
            value={content}
            onChangeText={changeContent}
            className={`${isFocused ? 'border-black500' : 'border-black200'} relative h-full
            rounded-2xl border-[1px] p-4 text-sm text-black900 font-PTDLight`}
            placeholder="일상을 기억할 수 있도록 글을 작성해 보세요."
            placeholderTextColor="#D9D9DC"
            cursorColor={'#1C1C1E'}
            selectionColor={'#1C1C1E'}
            textAlignVertical="top"
            scrollEnabled={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Text className={`${content.length === 500 ? 'text-fnRed' : 'text-black400'} absolute right-4 bottom-[314px] text-sm font-PTDLight`}>
            {content.length}/500
          </Text>
        </View>
      </View>
      <View className="absolute bottom-[20px] px-4 w-full">
        <Button onPress={selectTeamToShow}>다음</Button>
      </View>
    </>
  );
};

export default PostEditScreen;
