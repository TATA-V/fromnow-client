import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';

const MyAgenda = () => {
  const items = [
    { title: '2023-09-07', data: [{ hour: '12:00', name: 'Lunch' }] },
    { title: '2023-09-08', data: [{ hour: '14:00', name: 'Meeting' }] },
    { title: '2023-09-09', data: [] }, // 빈 날짜
  ];

  const renderItem = ({ item }) => {
    if (!item || item.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>No events for this day.</Text>
        </View>
      );
    }

    return (
      <View style={styles.itemContainer}>
        <Text>{item.hour}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <CalendarProvider date={items[0].title}>
      <ExpandableCalendar
        firstDay={1} // 월요일 시작
        markedDates={{
          '2023-09-07': { marked: true },
          '2023-09-08': { marked: true },
        }}
      />
      <AgendaList
        sections={items}
        renderItem={renderItem}
        horizontal={true} // 가로 스크롤 활성화
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨기기
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'gray',
          agendaTodayColor: 'red',
          agendaKnobColor: '#f2f2f2',
        }}
        scrollToNextEvent
        sectionStyle={styles.sectionHeader}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: 200, // 가로 아이템의 너비 설정
  },
  emptyContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, // 빈 아이템도 동일한 너비
  },
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default MyAgenda;
