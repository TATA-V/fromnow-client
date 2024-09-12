import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //CALENDAR STYLES
  calendarContainer: {
    overflow: 'hidden',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F3F3F8',
  },
  datesStrip: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarDates: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },

  //CALENDAR DAY
  dateRootContainer: {
    flex: 1,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dateName: {
    textAlign: 'center',
  },
  weekendDateName: {
    color: '#A7A7A7',
    textAlign: 'center',
  },
  dateNumber: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weekendDateNumber: {
    color: '#A7A7A7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    marginTop: 1,
    borderRadius: 5,
    opacity: 0,
  },

  // CALENDAR DOTS
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  visibleDot: {
    opacity: 1,
    backgroundColor: 'blue',
  },
  selectedDot: {
    backgroundColor: 'blue',
  },

  // Calendar Lines
  line: {
    height: 4,
    marginTop: 3,
    borderRadius: 1,
    opacity: 0,
  },
  linesContainer: {
    justifyContent: 'center',
  },
  visibleLine: {
    opacity: 1,
    backgroundColor: 'blue',
  },
  selectedLine: {
    backgroundColor: 'blue',
  },
});
