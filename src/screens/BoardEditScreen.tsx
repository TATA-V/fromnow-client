import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Text, Keyboard } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { SheetManager } from 'react-native-actions-sheet';
import Button from '@components/common/Button';
import { useModal } from '@components/Modal';
import { MotiView } from 'moti';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import DismissKeyboard from '@components/common/DismissKeyboard';
import useDeviceSize from '@hooks/useDeviceSize';
import { cn } from '@utils/cn';

interface Props {
  paramName: string;
}

const BoardEditScreen = ({}: Props) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { route } = useCurrentRoute();
  const { showModal } = useModal();
  const { height } = useDeviceSize();

  const changeContent = (text: string) => {
    if (text.length <= 500) {
      setContent(text);
    } else {
      showModal({ type: 'confirm', title: '경고', description: '글자 수가 500자를 초과했습니다.' });
    }
  };

  const selectTeamToShow = () => {
    SheetManager.show('select-team', { payload: { file: route.params.file, content } });
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const inputHeight = keyboardHeight !== 0 ? height - 125 - keyboardHeight : height - 152 - keyboardHeight;

  return (
    <>
      <DismissKeyboard>
        <View className="flex-1 px-4">
          <Image source={{ uri: route.params.file.path }} resizeMode="cover" className="w-[72px] h-[97px] rounded-[12px]" />
          <MotiView animate={{ height: inputHeight }} className="relative pt-4 pb-[200px]">
            <TextInput
              multiline
              autoFocus
              value={content}
              onChangeText={changeContent}
              className={cn(
                isFocused ? 'border-black900' : 'border-black200',
                'relative h-full rounded-2xl border-[1px] p-4 text-sm text-black900 font-PTDLight',
              )}
              placeholder="일상을 기억할 수 있도록 글을 작성해 보세요."
              placeholderTextColor="#D9D9DC"
              cursorColor={'#1C1C1E'}
              selectionColor={'#1C1C1E'}
              textAlignVertical="top"
              scrollEnabled={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Text className={cn(content.length === 500 ? 'text-fnRed' : 'text-black400', 'absolute right-4 bottom-[214px] text-sm font-PTDLight')}>
              {content.length}/500
            </Text>
          </MotiView>
        </View>
      </DismissKeyboard>
      <KeyboardAvoiding>
        <View className="absolute bottom-[-5px] pt-4 pb-[20px] px-4 w-full bg-white">
          <Button onPress={selectTeamToShow}>다음</Button>
        </View>
      </KeyboardAvoiding>
    </>
  );
};

export default BoardEditScreen;
