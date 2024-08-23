import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import CircleDangerIcon from '@assets/icons/circleDanger.svg';
import CircleCheckIcon from '@assets/icons/circleCheck.svg';
import CircleXIcon from '@assets/icons/circleX.svg';
import SearchIcon from '@assets/icons/search.svg';

type Mode = 'black' | 'error' | 'trust' | 'gray';

interface Props {
  mode?: Mode;
  placeholder?: string;
  editable?: boolean;
  search?: boolean;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onSubmitEditing?: () => void;
}

const Input = ({ mode, placeholder, editable = true, search, value, setValue, onSubmitEditing }: Props) => {
  const initialColor = editable
    ? ['border-black900', 'bg-white', 'text-black900', '#1C1C1E']
    : ['border-black200', 'bg-black200', 'text-black300', ''];

  const [color, setColor] = useState<string[]>(initialColor);
  const [isFocused, setIsFocused] = useState(false);
  const applyCustomStyles = isFocused || !editable || mode === 'error' || mode === 'trust';

  useEffect(() => {
    if (!editable) {
      setColor(['border-black200', 'bg-black200', 'text-black300', '']);
      return;
    }
    let tempColor: string[] = [];
    switch (mode) {
      case 'black':
        tempColor = ['border-black900', 'bg-white', 'text-black900', '#1C1C1E'];
        break;
      case 'error':
        tempColor = ['border-error', 'bg-white', 'text-error', '#F04438'];
        break;
      case 'trust':
        tempColor = ['border-success', 'bg-white', 'text-success', '#12B76A'];
        break;
      case 'gray':
        tempColor = ['border-success', 'bg-white', 'text-success', '#1C1C1E'];
        break;
      default:
        tempColor = ['border-black900', 'bg-white', 'text-black900', '#1C1C1E'];
    }
    setColor(tempColor);
  }, [mode]);

  return (
    <View className="relative w-full">
      <TextInput
        value={value}
        onChangeText={setValue}
        className={`${applyCustomStyles ? color.slice(0, -1).join(' ') : 'border-black200 bg-white text-black900'}
            caret-[${color[color.length - 1] || '#0e0e0e'}] font-PTDLight text-sm focus:outline-none h-[49px] w-full rounded-2xl border-[1px]
            ${search ? 'pl-[48px]' : 'pl-5'} pr-5 transition-[border-color,color] duration-300 ease-in-out`}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor="#E4E5EA"
        cursorColor={color[color.length - 1] || '#1C1C1E'}
        selectionColor={color[color.length - 1] || '#1C1C1E'}
        // prettier-ignore
        onFocus={() => { if (!editable) return; setIsFocused(true); }}
        // prettier-ignore
        onBlur={() => { if (!editable) return;  setIsFocused(false); }}
        multiline={false}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
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
