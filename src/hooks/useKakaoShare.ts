import { useCallback } from 'react';
import { shareFeedTemplate } from '@react-native-kakao/share';
import useToast from '@hooks/useToast';
import { KAKAO_SHARE_IMG } from '@env';

interface KakaoShareProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  webUrl?: string;
  mobileWebUrl?: string;
  buttonTitle?: string;
  params?: { [key: string]: string };
}

const useKakaoShare = () => {
  const { errorToast } = useToast();

  const kakaoShare = useCallback(
    async ({
      title = '프롬나우',
      description = '당신의 일상이 특별해지는 마법✧\n지금 바로 프롬나우를 시작해 보세요!',
      imageUrl = `${KAKAO_SHARE_IMG}`,
      webUrl = '',
      mobileWebUrl = '',
      buttonTitle = '자세히보기',
      params = { deepLink: 'bottom' },
    }: KakaoShareProps = {}) => {
      try {
        const template = {
          content: {
            title,
            description,
            imageUrl,
            link: {
              webUrl,
              mobileWebUrl,
            },
          },
          buttons: [
            {
              title: buttonTitle,
              link: {
                webUrl,
                mobileWebUrl,
                androidExecutionParams: params,
                iosExecutionParams: params,
              },
            },
          ],
        };

        await shareFeedTemplate({
          template,
          useWebBrowserIfKakaoTalkNotAvailable: true,
        });
      } catch (error) {
        errorToast('카카오톡으로 공유하는 데 실패했습니다.\n다시 시도해주세요.');
      }
    },
    [],
  );

  return { kakaoShare };
};

export default useKakaoShare;
