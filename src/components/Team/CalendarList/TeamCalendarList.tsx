import React, { useEffect, useState } from 'react';
import moment from 'moment-modification-rn';
import { Text, TouchableOpacity } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';
import ImageCards from '@components/Team/CalendarList/ImageCards';
import * as holidays from '@utils/holidays';
import useCurrentRoute from '@hooks/useCurrentRoute';
import useNavi from '@hooks/useNavi';

LocaleConfig.locales.fr = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd hui',
};
LocaleConfig.defaultLocale = 'fr';

function DayComponent({ date, state, marking }) {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const momentDate = moment(date.dateString);
  const isSaturday = momentDate.day() === 6;
  const isSunday = momentDate.day() === 0;

  let isHoliday = false;
  const year = date.dateString.split('-')[0];
  switch (year) {
    case '2024':
      isHoliday = holidays.holidays2024.includes(date.dateString);
      break;
    case '2025':
      isHoliday = holidays.holidays2025.includes(date.dateString);
      break;
    default:
      isHoliday = false;
      break;
  }

  const textColor = isSaturday ? 'text-fnBlue' : isSunday || isHoliday ? 'text-fnPink' : 'text-black900';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TeamDetail', { teamId: route.params.id, date: date.dateString })}
      className="h-[98px] items-center w-full">
      <Text className={`${textColor} font-UhBee text-[22px]`}>{date.day}</Text>
      <ImageCards imgs={['1', '2', '3']} />
    </TouchableOpacity>
  );
}

const TeamCalendarList = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CalendarList
      dayComponent={DayComponent}
      calendarHeight={600}
      pastScrollRange={10} // 과거 달력
      futureScrollRange={0}
      calendarStyle={{ paddingTop: 30, paddingBottom: 30 }}
      theme={
        {
          'stylesheet.calendar.main': {
            dayContainer: {
              flex: 1,
              padding: 0,
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
            },
            week: {
              marginTop: 0,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'center',
            },
          },
          'stylesheet.calendar.header': {
            header: {
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            },
            monthText: {
              color: '#1C1C1E',
              fontSize: 30,
              fontFamily: 'UhBeemysen',
            },
            dayHeader: {
              height: 50,
              color: '#B3B4B9',
              fontSize: 20,
              fontFamily: 'UhBeemysen',
              diplay: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 50,
            },
            week: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 50,
              borderBottomWidth: 1,
              borderColor: '#F3F3F8',
              marginHorizontal: 0,
              marginTop: 0,
            },
            dayTextAtIndex0: { color: '#FEC7C6' },
            dayTextAtIndex6: { color: '#8EB9E6' },
          },
        } as Theme
      }
      hideExtraDays={true}
      monthFormat={'yyyy년 M월'}
    />
  );
};

export default TeamCalendarList;
