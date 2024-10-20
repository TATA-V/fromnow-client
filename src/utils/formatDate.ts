import moment, { Moment } from 'moment-modification-rn';
import 'moment-modification-rn/locale/ko';
moment.locale('ko');

export const splitDate = (dateString: string | Moment) => {
  const date = moment(dateString);

  const year = date.format('YYYY').toString();
  const month = parseInt(date.format('MM'), 10).toString();
  const day = parseInt(date.format('DD'), 10).toString();

  return { year, month, day };
};

export const formatTime = (dateString: string | Moment) => {
  return moment(dateString).format('HH:mm:ss');
};

export const formatDate = (dateString: string | Moment = moment().format()) => {
  return moment(dateString).format('YYYY-MM-DD');
};
