import moment from 'moment-modification-rn';

export const cameraAccessible = () => {
  const currentTime = moment();
  const timeRanges = [
    { start: moment().set({ hour: 14, minute: 0 }), end: moment().set({ hour: 14, minute: 5 }) },
    { start: moment().set({ hour: 19, minute: 0 }), end: moment().set({ hour: 19, minute: 5 }) },
  ];
  const accessible = timeRanges.some(range => currentTime.isBetween(range.start, range.end));

  return {
    accessible,
  };
};
