import { selector, DefaultValue } from 'recoil';
import {
  clickedTabState,
  expenseListState,
  isOpenCalendarState,
  isOpenModalState,
  selectedDateState,
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
    const tabName = get(clickedTabState);
    const list = get(expenseListState);

    switch (tabName) {
      case '태그별':
      // return list.filter(({ items }) => items.tag === '화장품');
      default:
        return list;
    }
  },
});

export const setSelectedDateSelector = selector({
  key: 'setSelectedDateSelector',
  get: () => {
    return new Date(); // get에 원형값 적어주기
  },
  set: ({ set }, newDate) => {
    // DefaultValue 임포트
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else set(selectedDateState, newDate);
  },
});
