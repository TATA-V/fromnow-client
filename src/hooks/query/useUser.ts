import { updateNickname, updatePhoto } from '@api/user';
import { useMutation } from '@tanstack/react-query';
import useToast from '@hooks/useToast';

export const useUpdateNickname = () => {
  const { showToast } = useToast();

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: res => {
      console.log('res.data', res.data);
      showToast('닉네임 설정 완료!');
    },
    onError: error => {
      console.log('update nickname error', error);
      showToast('닉네임 변경에 실패했습니다.');
    },
  });

  return {
    updateNicknameMutation,
  };
};

export const useUpdatePhoto = () => {
  const { showToast } = useToast();

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: res => {
      console.log('res.data', res.data);
      console.log('res', res);
    },
    onError: () => {
      showToast('프로필 사진 변경에 실패했습니다.');
    },
  });

  return {
    updatePhotoMutation,
  };
};
