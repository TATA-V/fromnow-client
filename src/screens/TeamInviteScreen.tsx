import React, { useEffect } from 'react';
import { Text } from 'react-native';
import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import { usePostImmediateInvite } from '@hooks/query';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { getStorage } from '@utils/storage';

interface Props {
  paramName: string;
}

const TeamInviteScreen = ({}: Props) => {
  const { inviteTeamMutation } = usePostImmediateInvite();
  const { route } = useCurrentRoute();

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
        <Text className="font-UhBee text-black900 text-2xl text-center leading-[26px] mt-[6px]">잠시만 기다려주세요!</Text>
      </FullScreenMiniLoading>
    </>
  );
};

export default TeamInviteScreen;
