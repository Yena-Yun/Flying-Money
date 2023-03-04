import { addDays } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
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
      set(A.byWeekStartDateState, newDate);
      set(A.byWeekEndDateState, addDays(newDate, 6));
    }
  },
});
