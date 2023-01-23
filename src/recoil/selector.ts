import { selector } from 'recoil';
import { isOpenCalendarState, isOpenModalState } from './atom';

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
// export const openCalendarSelector = selector({
//   key: 'openCalendarSelector',
//   get: () => {},
//   set: ({ set }) => {
//     set(isOpenCalendarState, true);
//   },
// });

// export const closeCalendarSelector = selector({
//   key: 'closeCalendarSelector',
//   get: () => {},
//   set: ({ set }) => {
//     set(isOpenCalendarState, false);
//   },
// });

export const toggleCalendarSelector = selector({
  key: 'closeCalendarSelector',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenCalendar = get(isOpenCalendarState);
    if (isOpenCalendar) set(isOpenCalendarState, false);
    else set(isOpenCalendarState, true);
  },
});
