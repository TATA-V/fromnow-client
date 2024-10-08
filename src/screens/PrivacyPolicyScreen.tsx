import React from 'react';
import { View, ScrollView } from 'react-native';
import usePolicyStore from '@store/usePolicyStore';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { privacyPolicyData } from '@const/privacyPolicyData';
import { SheetManager } from 'react-native-actions-sheet';
import PolicyContent from '@components/Policy/PolicyContent';

const PrivacyPolicyScreen = () => {
  const { setIsChecked, setAnimated } = usePolicyStore(state => state);
  const { navigation } = useNavi();

  const onConfirm = () => {
    setIsChecked({ privacyPolicy: true });
    setAnimated(false);
    SheetManager.show('signup-policy');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
      <PolicyContent policyData={privacyPolicyData} />
      <View className="pb-4 pt-[46px]">
        <Button onPress={onConfirm}>확인</Button>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
