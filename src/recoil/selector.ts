import { selector, DefaultValue } from 'recoil';
import {
  clickedTabState,
  expenseListState,
  filteredWeekState,
  isOpenCalendarState,
  isOpenModalState,
  selectedDateState,
  transactionListState,
  transactionState,
} from './atom';

export const openModalSelector = selector({
  key: 'openModalSelector',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, true);
  },
});

export const closeModalSelector = selector({
  key: 'closeModalSelector',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, false);
  },
});

export const toggleCalendarSelector = selector({
  key: 'closeCalendarSelector',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenCalendar = get(isOpenCalendarState);
    if (isOpenCalendar) set(isOpenCalendarState, false);
    else set(isOpenCalendarState, true);
  },
});

export const tabClickSelector = selector({
  key: 'tabClickSelector',
  get: ({ get }) => {
    return get(clickedTabState);
  },
  set: ({ set }, newTab) => {
    set(clickedTabState, newTab);
  },
});

export const selectedDateSelector = selector({
  key: 'selectedDateSelector',
  get: () => {
    return new Date(); // void 피하기 -> get에 원형값 입력
  },
  set: ({ set }, newDate) => {
    // DefaultValue 임포트
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else set(selectedDateState, newDate);
  },
});

export const filteredWeekSelector = selector({
  key: 'filteredWeekSelector',
  get: ({ get }) => {
    const weekStart = get(filteredWeekState).start;
    const weekEnd = get(filteredWeekState).end;
  },
  set: () => {},
});

export const expenseListSelector = selector({
  key: 'expenseListSelector',
  get: () => {
    return [];
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      set(expenseListState, newValue);
    }
  },
});

export const transactionSelector = selector({
  key: 'transactionSelector',
  get: ({ get }) => {
    return {
      id: '',
      date: new Date(),
      title: '',
      items: get(expenseListState),
    };
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      set(transactionState, newValue);
    }
  },
});

export const transactionListSelector = selector({
  key: 'transactionListSelector',
  get: () => {
    // return [];
  },
  set: ({ get, set }) => {
    const item = get(transactionState);
    const list = get(transactionListState);

    set(transactionListState, [...list, item]);
  },
});
