import moment from 'moment-modification-rn';

export const cameraAccessible = () => {
  const currentTime = moment().utcOffset(9);
  const timeRanges = [{ start: moment().utcOffset(9).set({ hour: 15, minute: 0 }), end: moment().utcOffset(9).set({ hour: 15, minute: 5 }) }];
  const accessible = timeRanges.some(range => currentTime.isBetween(range.start, range.end));

  return {
    accessible,
  };
};
