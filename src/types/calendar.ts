export interface CalendarRow {
  new: boolean;
  hasPosts: boolean;
  date: string;
}

export interface CalendarRowMap {
  [key: string]: CalendarRow;
}

export interface CalendarCol {
  date: string;
  blur: true;
  photoUrls: string[];
}

export interface CalendarColMap {
  [key: string]: CalendarCol;
}
