import React from 'react';
import { View, ScrollView } from 'react-native';
import usePolicyStore from '@store/usePolicyStore';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { servicePolicyData, servicePolicyDataEn } from '@const/servicePolicyData';
import { SheetManager } from 'react-native-actions-sheet';
import PolicyContent from '@components/Policy/PolicyContent';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { useTranslation } from 'react-i18next';
import { isKo } from '@utils/localize';

interface Props {
  paramName: string;
}

const ServicePolicyScreen = ({}: Props) => {
  const { setIsChecked, setAnimated } = usePolicyStore(state => state);
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const { t } = useTranslation();
  const showSignupPolicy = route.params.showSignupPolicy;

  const onConfirm = () => {
    if (!showSignupPolicy) return;
    setIsChecked({ servicePolicy: true });
    setAnimated(false);
    SheetManager.show('signup-policy');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView
      className="px-4 space-y-[8px]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: !showSignupPolicy ? 30 : undefined }}>
      <PolicyContent policyData={isKo() ? servicePolicyData : servicePolicyDataEn} />
      {showSignupPolicy && (
        <View className="pb-4 pt-[38px]">
          <Button onPress={onConfirm}>{t('base.ok')}</Button>
        </View>
      )}
    </ScrollView>
  );
};

export default ServicePolicyScreen;
