import { selector, DefaultValue } from 'recoil';
import { DateFn } from 'utils';
import * as A from '../atom/dateState';

export const selectedDateSelector = selector({
  key: 'handleDateSelection',
  get: () => {
    return new Date();
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else {
      set(A.addModalDateState, newDate);
    }
  },
});

export const selectedMiniDateSelector = selector({
  key: 'handleMiniDateSelection',
  get: () => {
    return new Date();
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else {
      set(A.byDateSelectedDateState, newDate);
    }
  },
});

export const selectedStartEndDateSelector = selector({
  key: 'handleStartDateAndEndDateSelection',
  get: () => {
    return new Date();
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else {
      set(A.byWeekStartDateState, DateFn.startOfWeek(newDate));
      set(A.byWeekEndDateState, DateFn.endOfWeek(newDate));
    }
  },
});
