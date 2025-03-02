import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment-modification-rn';
import { isKo } from '@utils/localize';

import styles from './Calendar.style.js';

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

    const yearMonthFormat = isKo() ? 'YYYY년 M월' : 'MMMM yyyy';

    if (firstDay.year() === lastDay.year() && firstDay.month() === lastDay.month()) {
      return firstDay.format(yearMonthFormat);
    } else if (firstDay.year() === lastDay.year()) {
      return `${firstDay.format(isKo() ? 'YYYY년 M월' : 'MMMM yyyy')} / ${lastDay.format(isKo() ? 'M월' : 'MMMM')}`;
    } else {
      return `${firstDay.format(isKo() ? 'YYYY년 M월' : 'MMMM yyyy')} / ${lastDay.format(isKo() ? 'YYYY년 M월' : 'MMMM yyyy')}`;
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
    // const enabledLeft = isEnabled(controlDateLeft, weekStartDate, weekEndDate);
    // const enabledRight = isEnabled(controlDateRight, weekStartDate, weekEndDate);

    return (
      <View className="items-center">
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
      </View>
    );
  }
}

export default CalendarHeader;
