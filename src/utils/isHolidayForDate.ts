import * as holidays from '@utils/holidays';

export const isHolidayForDate = ({ dateString }: { dateString: string }) => {
  const year = dateString.split('-')[0];
  let isHoliday = false;
  switch (year) {
    case '2024':
      isHoliday = holidays.holidays2024.includes(dateString);
      break;
    case '2025':
      isHoliday = holidays.holidays2025.includes(dateString);
      break;
    case '2026':
      isHoliday = holidays.holidays2026.includes(dateString);
      break;
    case '2027':
      isHoliday = holidays.holidays2027.includes(dateString);
      break;
    case '2028':
      isHoliday = holidays.holidays2028.includes(dateString);
      break;
    case '2029':
      isHoliday = holidays.holidays2029.includes(dateString);
      break;
    case '2030':
      isHoliday = holidays.holidays2030.includes(dateString);
      break;
    default:
      isHoliday = false;
      break;
  }

  return {
    isHoliday,
  };
};
