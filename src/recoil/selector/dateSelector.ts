import { addDays } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
import * as A from '../atom/dateState';

export const selectedDateSelector = selector({
  key: 'handleSelectDate',
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
  key: 'handleMiniSelectDate',
  get: () => {
    return {
      flag: '',
      newDate: new Date(),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      if (newValue.flag === 'byDate') {
        set(A.byDateSelectedDateState, newValue.newDate);
      } else {
        set(A.byWeekStartDateState, newValue.newDate);
        set(A.byWeekEndDateState, addDays(newValue.newDate, 6));
      }
    }
  },
});

export const startDateSelector = selector({
  key: 'handleStartDate',
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
