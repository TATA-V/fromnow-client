import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import CircleDangerIcon from '@assets/icons/circleDanger.svg';
import CircleCheckIcon from '@assets/icons/circleCheck.svg';
import CircleXIcon from '@assets/icons/CircleXIcon';
import SearchIcon from '@assets/icons/SearchIcon';

type Mode = 'black' | 'error' | 'trust' | 'gray';

interface Props {
  autoFocus?: boolean;
  mode?: Mode;
  placeholder?: string;
  editable?: boolean;
  search?: boolean;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onSubmitEditing?: () => void;
}

const Input = ({ autoFocus = false, mode = 'black', placeholder, editable = true, search, value, setValue, onSubmitEditing }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const color = useMemo(() => {
    if (!editable) {
      return ['border-black200', 'bg-black200', 'text-black300', ''];
    }

    switch (mode) {
      case 'black':
        return ['border-black900', 'bg-white', 'text-black900', '#1C1C1E'];
      case 'error':
        return ['border-fnRed', 'bg-white', 'text-fnRed', '#F04438'];
      case 'trust':
        return ['border-success', 'bg-white', 'text-success', '#12B76A'];
      case 'gray':
        return ['border-black300', 'bg-white', 'text-black900', '#1C1C1E'];
      default:
        return ['border-black900', 'bg-white', 'text-black900', '#1C1C1E'];
    }
  }, [mode, editable]);

  const inputClassName = useMemo(() => {
    const baseClasses = 'font-PTDLight text-sm h-[49px] w-full rounded-2xl border-[1px]';
    const paddingClasses = search ? 'pl-[48px]' : 'pl-5';
    const focusClasses = `${isFocused ? color.join(' ') : 'border-black200 bg-white text-black900'}`;
    return `${baseClasses} ${focusClasses} ${paddingClasses} pr-5 transition-[border-color,color] duration-300 ease-in-out`;
  }, [isFocused, color, search]);

  return (
    <View className="relative w-full">
      <TextInput
        autoFocus={autoFocus}
        value={value}
        onChangeText={setValue}
        className={inputClassName}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor="#E4E5EA"
        cursorColor={color[3] || '#1C1C1E'}
        selectionColor={color[3] || '#1C1C1E'}
        onFocus={() => {
          if (editable) setIsFocused(true);
        }}
        onBlur={() => {
          if (editable) setIsFocused(false);
        }}
        multiline={false}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
        scrollEnabled={false}
        blurOnSubmit={false}
      />
      <View className="absolute right-[16px] h-full justify-center">
        {mode === 'error' && <CircleDangerIcon />}
        {mode === 'trust' && <CircleCheckIcon />}
      </View>
      {search && (
        <>
          <View className="absolute left-[16px] h-full justify-center">
            <SearchIcon />
          </View>
          {value && value.length !== 0 && (
            <Pressable onPress={() => setValue('')} className="absolute right-[16px] h-full justify-center">
              <CircleXIcon />
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

export default Input;
