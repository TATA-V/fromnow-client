import React, { useEffect } from 'react';
import { Text } from 'react-native';
import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import { usePostImmediateInvite } from '@hooks/query';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { getStorage } from '@utils/storage';
import { useTranslation } from 'react-i18next';

interface Props {
  paramName: string;
}

const TeamInviteScreen = ({}: Props) => {
  const { inviteTeamMutation } = usePostImmediateInvite();
  const { route } = useCurrentRoute();
  const { t } = useTranslation();

  useEffect(() => {
    const inviteTeam = async () => {
      const diaryId = route.params.id;
      const profileName = await getStorage('name');
      inviteTeamMutation.mutate({ diaryId, profileName });
    };
    inviteTeam();
  }, []);

  return (
    <>
      <FullScreenMiniLoading>
        <Text className="font-UhBee text-black900 text-2xl text-center leading-[26px] mt-[6px]">{t('teamInvite.wating')}</Text>
      </FullScreenMiniLoading>
    </>
  );
};

export default TeamInviteScreen;
