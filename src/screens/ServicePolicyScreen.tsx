import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import usePolicyStore from '@store/usePolicyStore';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { servicePolicyData } from '@const/servicePolicyData';
import { SheetManager } from 'react-native-actions-sheet';
import PolicyContent from '@components/Policy/PolicyContent';

const ServicePolicyScreen = () => {
  const { setIsChecked, setAnimated } = usePolicyStore(state => state);
  const { navigation } = useNavi();

  const onConfirm = () => {
    setIsChecked({ servicePolicy: true });
    setAnimated(false);
    SheetManager.show('signup-policy');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView className="px-4 space-y-[8px]" showsVerticalScrollIndicator={false}>
      <PolicyContent policyData={servicePolicyData} />
      <View className="pb-4 pt-[38px]">
        <Button onPress={onConfirm}>확인</Button>
      </View>
    </ScrollView>
  );
};

export default ServicePolicyScreen;
