export interface CalendarRow {
  new: number;
  hasPosts: boolean;
  date: string;
}

export interface CalendarRowMap {
  [key: string]: CalendarRow;
}
