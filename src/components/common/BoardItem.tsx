import React, { useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import HeartIcon from '@assets/icons/HeartIcon';
import { Board } from '@clientTypes/board';
import { formatDate, formatTime } from '@utils/formatDate';
import { QUERY_KEY, useDisLikeBoard, useKey, useLikeBoard } from '@hooks/query';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@hooks/useOptimization';
import { isKo } from '@utils/localize';

interface Props extends Board {
  isMyLikedBoard?: boolean;
}

const BoardItem = (props: Props) => {
  const { isMyLikedBoard = false, boardId, createdDate, profilePhotoUrl, profileName, contentPhotoUrl, content, likes, liked } = props;
  const diaryId = useSelectedTeamStore(state => state.id);
  const queryClient = useQueryClient();
  const format = formatDate(createdDate);
  const boardsKey = useKey(['all', QUERY_KEY.BOARD, diaryId, format]);
  const myLikedBoardsKey = useKey([QUERY_KEY.MY, 'liked', 'posts']);

  const [localLiked, setLocalLiked] = useState(liked);
  const [localLikes, setLocalLikes] = useState(likes);
  const prevLikedRef = useRef<boolean>(liked);

  const { likeBoardMutation } = useLikeBoard();
  const { disLikeBoardMutation } = useDisLikeBoard();

  const updateBoardData = () => {
    queryClient.invalidateQueries({ queryKey: boardsKey });
    queryClient.invalidateQueries({ queryKey: myLikedBoardsKey });
  };

  const debounceLikeMutation = useDebounce((newLiked: boolean, newLikes: number) => {
    if (newLiked === prevLikedRef.current) {
      prevLikedRef.current = newLiked;
      return;
    }

    if (newLiked) {
      likeBoardMutation.mutate(boardId, {
        onSuccess: res => {
          updateBoardData();
          setLocalLikes(res.likes);
        },
        onError: () => {
          setLocalLiked(false);
          setLocalLikes(prev => prev - 1);
        },
      });
      prevLikedRef.current = newLiked;
      return;
    }

    if (newLikes < 0) return;
    disLikeBoardMutation.mutate(boardId, {
      onSuccess: res => {
        updateBoardData();
        setLocalLikes(res.likes);
      },
      onError: () => {
        setLocalLiked(true);
        setLocalLikes(prev => prev + 1);
      },
    });
    prevLikedRef.current = newLiked;
  }, 500);

  const toggleLike = () => {
    const newLiked = !localLiked;
    const newLikes = newLiked ? localLikes + 1 : localLikes - 1;
    setLocalLiked(newLiked);
    setLocalLikes(newLikes);

    debounceLikeMutation(newLiked, newLikes);
  };

  return (
    <View className="space-y-3 p-4 bg-white border-[1px] border-black200 rounded-3xl">
      <View className="flex flex-row space-x-[8px] h-[36px] items-center">
        <View className="w-[36px] h-[36px] border-[1px] border-black200 rounded-xl overflow-hidden">
          <Image source={{ uri: profilePhotoUrl }} className="w-full h-full rounded-xl" resizeMode="cover" />
        </View>
        <Text className="text-black900 text-sm font-PTDLight">{profileName}</Text>
      </View>
      <View className="w-full h-[311px] rounded-xl overflow-hidden">
        <Image source={{ uri: contentPhotoUrl }} className="w-full h-full rounded-xl" resizeMode="cover" />
      </View>
      <View className="h-[42px] space-y-[6px]">
        <TouchableOpacity onPress={toggleLike} className="w-[24px] h-[24px] flex justify-center items-center">
          <HeartIcon color={localLiked ? '#FEC7C6' : '#E4E5EA'} />
        </TouchableOpacity>
        <Text className="text-black900 text-[12px] font-PTDLight">{isKo() ? `좋아요 ${localLikes}개` : `Likes ${localLikes}`}</Text>
      </View>
      <View>
        <Text className="text-black900 font-UhBee text-xl leading-[20px] mt-[4px]">{content}</Text>
      </View>
      <Text className="text-black400 font-PTDLight text-[12px]">{formatTime(createdDate)}</Text>
    </View>
  );
};

export default BoardItem;
