export interface CalendarRow {
  new: boolean;
  hasPosts: boolean;
  date: string;
}

export interface CalendarRowMap {
  [key: string]: CalendarRow;
}
