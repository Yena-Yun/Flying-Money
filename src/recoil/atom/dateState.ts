import { atom } from 'recoil';
import { DateFn } from 'utils';

export const addModalDateState = atom({
  key: 'addModalDate',
  default: new Date(),
});

export const allSelectedDateState = atom({
  key: 'showAllSelectedDate',
  default: new Date(),
});

export const byDateSelectedDateState = atom({
  key: 'filterByDateSelectedDate',
  default: new Date(),
});

export const byWeekStartDateState = atom({
  key: 'filterByWeekStartDate',
  default: new Date(),
});

export const byWeekEndDateState = atom({
  key: 'filterByWeekEndDate',
  default: new Date(),
});
