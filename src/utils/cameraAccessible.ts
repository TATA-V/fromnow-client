import { getDate } from '@utils/formatDate';

export const cameraAccessible = () => {
  const currentTime = getDate().utcOffset(9);
  const timeRanges = [{ start: getDate().utcOffset(9).set({ hour: 15, minute: 0 }), end: getDate().utcOffset(9).set({ hour: 15, minute: 5 }) }];
  const accessible = timeRanges.some(range => currentTime.isBetween(range.start, range.end));

  return {
    accessible,
  };
};
