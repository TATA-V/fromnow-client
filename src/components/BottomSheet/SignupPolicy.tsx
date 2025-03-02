import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import CheckLineIcon from '@assets/icons/checkLine.svg';
import CheckFillIcon from '@assets/icons/checkFill.svg';
import RightArrowIcon from '@assets/icons/RightArrowIcon';
import usePolicyStore from '@store/usePolicyStore';
import useNavi from '@hooks/useNavi';
import useToast from '@hooks/useToast';
import Button from '@components/common/Button';
import { useTranslation } from 'react-i18next';

interface PolicyList {
  name: string;
  path?: string;
  content: string;
}

const SignupPolicy = () => {
  const { navigation } = useNavi();
  const policyState = usePolicyStore(state => state);
  const { all, privacyPolicy, servicePolicy, ageConfirm, animated, setAnimated, setIsChecked, reset } = policyState;
  const { successToast } = useToast();
  const { t } = useTranslation();

  const list: PolicyList[] = [
    { name: 'servicePolicy', path: 'ServicePolicy', content: `${t('policy.service')}` },
    { name: 'privacyPolicy', path: 'PrivacyPolicy', content: `${t('policy.privacy')}` },
    { name: 'ageConfirm', content: `${t('policy.ageConfirm')}` },
  ];

  const toggleCheck = (value: string) => {
    const newChecked = { ...policyState, [value]: !policyState[value] };
    const allChecked = Object.values(newChecked).every(Boolean);
    setIsChecked({ ...newChecked, all: allChecked });
  };
  const toggleAllTerms = () => {
    const check = !all ? true : false;
    setIsChecked({ all: !all, privacyPolicy: check, servicePolicy: check, ageConfirm: check });
  };

  const agreeAndContinue = () => {
    SheetManager.hide('signup-policy');
    navigation.navigate('SignupNickname');
    successToast(t('signin.congratulations'));
    reset();
  };

  const clickContent = (item: PolicyList) => {
    if (item.path) {
      navigation.navigate(item.path, { showSignupPolicy: true });
      SheetManager.hide('signup-policy');
      return;
    }
    toggleCheck(item.name);
  };

  return (
    <ActionSheet containerStyle={styles.container} animated={animated} onClose={() => setAnimated(true)}>
      <View className="w-full justify-center items-center h-[66px]">
        <Text className="text-black900 text-base font-PTDSemiBold">{t('policy.title')}</Text>
      </View>
      <View className="flex flex-row h-[52px] items-center">
        <Pressable onPress={toggleAllTerms} className="flex flex-row items-center">
          {all ? <CheckFillIcon /> : <CheckLineIcon />}
          <Text className="text-black900 text-sm font-PTDSemiBold ml-1">{t('policy.agreeAll')}</Text>
        </Pressable>
      </View>
      <View className="h-[124px] flex flex-col justify-around">
        {list.map((item, idx) => (
          <View key={idx} className="flex-row items-center">
            <TouchableOpacity onPress={() => toggleCheck(item.name)} className="flex flex-row items-center">
              {policyState[item.name] ? <CheckFillIcon /> : <CheckLineIcon />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clickContent(item)} className="flex-row items-center w-full justify-between pr-4">
              <Text className="text-black900 text-sm font-PTDLight ml-1">{item.content}</Text>
              {item.name !== 'ageConfirm' && <RightArrowIcon size={16} color="#1C1C1E" />}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View className="h-[80px] flex justify-center">
        <Button disabled={!(ageConfirm && servicePolicy && privacyPolicy)} onPress={agreeAndContinue}>
          {t('policy.joinComplete')}
        </Button>
      </View>
    </ActionSheet>
  );
};

export default SignupPolicy;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    opacity: 1,
  },
});
