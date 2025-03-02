import moment, { Moment } from 'moment-modification-rn';

export const getDate = (dateString: string | Moment = moment().format()) => {
  const date = moment(dateString, 'YYYYMMDDHHmmss');
  return date;
};

export const splitDate = (dateString: string | Moment) => {
  const date = getDate(dateString);

  const year = date.format('YYYY').toString();
  const month = parseInt(date.format('MM'), 10).toString();
  const day = parseInt(date.format('DD'), 10).toString();

  return { year, month, day };
};

export const formatTime = (dateString: string | Moment) => {
  return getDate(dateString).utcOffset(9).format('HH:mm:ss');
};

export const formatDate = (dateString: string | Moment = moment().format()) => {
  return getDate(dateString).format('YYYY-MM-DD');
};
