import { updateNickname, updatePhoto } from '@api/user';
import { useMutation } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import useCurrentRoute from '@hooks/useCurrentRoute';

export const useUpdateNickname = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      if (route.name === 'Nickname') {
        successToast('별명 설정 완료!');
        navigation.navigate('SignupPhoto');
        return;
      }
      successToast('닉네임 변경 완료!');
    },
    onError: error => {
      if (error.message === 'Request failed with status code 409') {
        errorToast('이미 존재하는 별명입니다.');
        return;
      }
      errorToast('별명 변경에 실패했습니다.');
    },
  });

  return {
    updateNicknameMutation,
  };
};

export const useUpdatePhoto = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: () => {
      if (route.name === 'Photo') {
        navigation.navigate('Home');
        successToast('🎉 프롬나우에서 멋진 시간을 보내세요!');
        return;
      }
      successToast('이미지 수정 완료!');
    },
    onError: () => {
      errorToast('프로필 사진 변경에 실패했습니다.');
    },
  });

  return {
    updatePhotoMutation,
  };
};
