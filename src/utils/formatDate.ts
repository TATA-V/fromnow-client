import moment, { Moment } from 'moment-modification-rn';
import 'moment-modification-rn/locale/ko';
moment.locale('ko');

export const splitDate = (dateString: string | Moment) => {
  const date = moment(dateString);

  const year = date.format('YYYY').toString();
  const month = date.format('MM').toString();
  const day = date.format('DD').toString();

  return { year, month, day };
};

export const formatTime = (dateString: string | Moment) => {
  return moment(dateString).format('HH:mm:ss');
};

export const formatDate = (dateString: string | Moment = moment().format()) => {
  return moment(dateString).format('YYYY-MM-DD');
};
