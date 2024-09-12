import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment-modification-rn';

import styles from './Calendar.style.js';
import LeftArrowIcon from './icons/LeftArrowIcon';
import RightArrowIcon from './icons/RightArrowIcon';

class CalendarHeader extends Component {
  static propTypes = {
    controlDateLeft: PropTypes.any,
    controlDateRight: PropTypes.any,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    calendarHeaderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    weekStartDate: PropTypes.object,
    weekEndDate: PropTypes.object,
    allowHeaderTextScaling: PropTypes.bool,
    fontSize: PropTypes.number,
    headerText: PropTypes.string,
    onHeaderSelected: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  // 변경
  formatCalendarHeader(calendarHeaderFormat) {
    if (!this.props.weekStartDate || !this.props.weekEndDate) {
      return '';
    }

    const firstDay = this.props.weekStartDate;
    const lastDay = this.props.weekEndDate;

    const yearMonthFormat = 'YYYY년 M월';

    if (firstDay.year() === lastDay.year() && firstDay.month() === lastDay.month()) {
      return firstDay.format(yearMonthFormat);
    } else if (firstDay.year() === lastDay.year()) {
      return `${firstDay.format('YYYY년 M월')} / ${lastDay.format('M월')}`;
    } else {
      return `${firstDay.format('YYYY년 M월')} / ${lastDay.format('YYYY년 M월')}`;
    }
  }

  render() {
    const {
      controlDateLeft,
      controlDateRight,
      onLeftPress,
      onRightPress,
      calendarHeaderFormat,
      onHeaderSelected,
      calendarHeaderContainerStyle,
      calendarHeaderStyle,
      fontSize,
      allowHeaderTextScaling,
      weekStartDate: _weekStartDate,
      weekEndDate: _weekEndDate,
      headerText,
    } = this.props;

    if (!_weekStartDate || !_weekEndDate) return null;

    const _headerText = headerText || this.formatCalendarHeader(calendarHeaderFormat);
    const weekStartDate = _weekStartDate && _weekStartDate.clone();
    const weekEndDate = _weekEndDate && _weekEndDate.clone();

    function isEnabled(controlDate, startDate, endDate) {
      if (controlDate) {
        return !moment(controlDate).isBetween(startDate, endDate, 'day', '[]');
      }
      return true;
    }
    const enabledLeft = isEnabled(controlDateLeft, weekStartDate, weekEndDate);
    const enabledRight = isEnabled(controlDateRight, weekStartDate, weekEndDate);

    return (
      <View className="items-center">
        <View className="flex flex-row">
          <TouchableOpacity disabled={!enabledLeft} onPress={onLeftPress} className="justify-center p-[10px]">
            <LeftArrowIcon color={enabledLeft ? '#1C1C1E' : '#D9D9DC'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onHeaderSelected && onHeaderSelected.bind(this, { weekStartDate, weekEndDate })}
            disabled={!onHeaderSelected}
            style={calendarHeaderContainerStyle}>
            <Text
              className="font-PTDSemiBold text-base text-black"
              style={[styles.calendarHeader, { fontSize: fontSize }, calendarHeaderStyle]}
              allowFontScaling={allowHeaderTextScaling}>
              {_headerText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={!enabledRight} onPress={onRightPress} className="justify-center p-[10px]">
            <RightArrowIcon color={enabledRight ? '#1C1C1E' : '#D9D9DC'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
