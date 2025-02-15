import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { DateData, DayState, Theme } from 'react-native-calendars/src/types';
import ImageCards from '@components/Team/CalendarList/ImageCards';
import useCurrentRoute from '@hooks/useCurrentRoute';
import useNavi from '@hooks/useNavi';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import { useColCalendar } from '@hooks/query';
import { formatDate, getDate } from '@utils/formatDate';
import { CalendarCol, CalendarColMap } from '@clientTypes/calendar';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { isHolidayForDate } from '@utils/isHolidayForDate';
import moment from 'moment-modification-rn';

LocaleConfig.locales.fr = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd hui',
};
LocaleConfig.defaultLocale = 'fr';

interface DayComponentProps {
  calendarMap: CalendarColMap;
  date?: DateData;
  state?: DayState;
  marking?: MarkingProps;
}

function DayComponent({ calendarMap, date, state, marking }: DayComponentProps) {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const dateString = date.dateString;
  const momentDate = getDate(dateString).utcOffset(9);
  const isSaturday = momentDate.day() === 6;
  const isSunday = momentDate.day() === 0;
  const dayData = calendarMap[dateString];
  const { isHoliday } = isHolidayForDate({ dateString });

  const textColor = isSaturday ? 'text-fnBlue' : isSunday || isHoliday ? 'text-fnPink' : 'text-black900';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TeamDetail', { teamId: route.params.id, date: dateString })}
      className="h-[98px] items-center w-full">
      <Text className={`${textColor} font-UhBee text-[22px]`}>{date.day}</Text>
      {dayData && !dayData.blur && dayData.photoUrls.length > 0 && <ImageCards imgs={dayData.photoUrls} />}
    </TouchableOpacity>
  );
}

const TeamCalendarList = () => {
  const { id: diaryId, recivedAt } = useSelectedTeamStore();
  const startDate = getDate(recivedAt).utcOffset(9);
  const currentDate = getDate().utcOffset(9);
  const monthsDiff = currentDate.diff(startDate, 'months');
  const [calendarMap, setCalendarMap] = useState<CalendarColMap>({});
  const [fetchMonth, setFetchMonth] = useState(getDate().utcOffset(9).format('YYYY-MM-DD'));
  const { data: calendarData } = useColCalendar({ diaryId, date: fetchMonth, num: monthsDiff === 0 ? 1 : 2 });
  const [pastScrollRange, setPastScrollRange] = useState(0);
  useEffect(() => {
    if (!calendarData || !calendarData[0] || !calendarData[0].date) return;
    const update = currentDate.diff(moment(calendarData[0].date).utcOffset(9), 'months');
    setPastScrollRange(update);
  }, [calendarData]);

  const onVisibleMonthsChange = async (months: { dateString: string }[]) => {
    const newVisibleMonth = months[0]?.dateString;
    const nextMonth = getDate(newVisibleMonth).utcOffset(9).add(1, 'months').format('YYYY-MM-DD');

    if (!calendarMap[newVisibleMonth]) {
      setFetchMonth(newVisibleMonth);
      return;
    }

    if (!calendarMap[nextMonth]) {
      setFetchMonth(nextMonth);
    }
  };

  useEffect(() => {
    if (!calendarData) return;

    const mappedData = calendarData.reduce((acc: CalendarColMap, item: CalendarCol) => {
      const format = formatDate(item.date);
      acc[format] = item;
      return acc;
    }, {});
    setCalendarMap(prev => {
      if (JSON.stringify(prev) === JSON.stringify(mappedData)) {
        return prev;
      }
      return { ...prev, ...mappedData };
    });
  }, [calendarData]);

  return (
    <CalendarList
      initialScrollIndex={calendarData && calendarData?.length > 0 ? 0 : undefined}
      onVisibleMonthsChange={onVisibleMonthsChange}
      dayComponent={dayProps => <DayComponent {...dayProps} calendarMap={calendarMap} />}
      calendarHeight={600}
      pastScrollRange={pastScrollRange}
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
              display: 'flex',
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
