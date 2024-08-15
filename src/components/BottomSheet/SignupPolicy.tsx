import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import CheckLineIcon from '@assets/icons/checkLine.svg';
import CheckFillIcon from '@assets/icons/checkFill.svg';

import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';

const SignupPolicy = () => {
  const [isChecked, setIsChecked] = useState({
    all: false,
    serviceAgree: false,
    personalInfo: false,
    ageConfirm: false,
  });
  const { navigation } = useNavi();

  const list = [
    { name: 'serviceAgree', content: '[필수] 서비스 이용에 동의합니다' },
    { name: 'personalInfo', content: '[필수] 개인정보 수집 및 이용에 동의합니다' },
    { name: 'ageConfirm', content: '[필수] 만 14세 이상입니다' },
  ];

  const toggleCheck = (value: string) => {
    setIsChecked(prev => {
      const newChecked = { ...prev, [value]: !prev[value] };
      const allChecked = Object.values(newChecked).every(Boolean);
      return { ...newChecked, all: allChecked };
    });
  };
  const toggleAllTerms = () => {
    const check = !isChecked.all ? true : false;
    setIsChecked({ all: !isChecked.all, serviceAgree: check, personalInfo: check, ageConfirm: check });
  };

  const agreeAndContinue = () => {
    SheetManager.hide('signup-policy');
    navigation.navigate('SignupNickname');
  };

  return (
    <ActionSheet containerStyle={styles.container}>
      <View className="w-full justify-center items-center h-[66px]">
        <Text className="text-black900 text-base font-PTDSemiBold">약관 동의</Text>
      </View>
      <View className="flex flex-row h-[52px] items-center">
        <Pressable onPress={toggleAllTerms} className="flex flex-row items-center">
          {isChecked.all ? <CheckFillIcon /> : <CheckLineIcon />}
          <Text className="text-black900 text-sm font-PTDSemiBold ml-1">전체 약관에 동의합니다</Text>
        </Pressable>
      </View>
      <View className="h-[124px] flex flex-col justify-around">
        {list.map((item, idx) => (
          <View key={idx}>
            <Pressable onPress={() => toggleCheck(item.name)} className="flex flex-row items-center">
              {isChecked[item.name] ? <CheckFillIcon /> : <CheckLineIcon />}
              <Text className="text-black900 text-sm font-PTDLight ml-1">{item.content}</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <View className="h-[80px] flex justify-center">
        <Button disabled={!(isChecked.ageConfirm && isChecked.personalInfo && isChecked.serviceAgree)} onPress={agreeAndContinue}>
          가입 완료
        </Button>
      </View>
    </ActionSheet>
  );
};

export default SignupPolicy;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    maxWidth: 598,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
