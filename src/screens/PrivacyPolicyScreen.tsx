import React from 'react';
import { View, ScrollView } from 'react-native';
import usePolicyStore from '@store/usePolicyStore';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { privacyPolicyData } from '@const/privacyPolicyData';
import { SheetManager } from 'react-native-actions-sheet';
import PolicyContent from '@components/Policy/PolicyContent';
import useCurrentRoute from '@hooks/useCurrentRoute';

interface Props {
  paramName: string;
}

const PrivacyPolicyScreen = ({}: Props) => {
  const { setIsChecked, setAnimated } = usePolicyStore(state => state);
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const showSignupPolicy = route.params.showSignupPolicy;

  const onConfirm = () => {
    if (!showSignupPolicy) return;
    setIsChecked({ privacyPolicy: true });
    setAnimated(false);
    SheetManager.show('signup-policy');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView className="px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: !showSignupPolicy ? 30 : undefined }}>
      <PolicyContent policyData={privacyPolicyData} />
      {showSignupPolicy && (
        <View className="pb-4 pt-[46px]">
          <Button onPress={onConfirm}>확인</Button>
        </View>
      )}
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
