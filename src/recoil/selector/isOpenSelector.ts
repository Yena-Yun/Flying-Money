import { selector } from 'recoil';
import * as A from '../atom/isOpenState';

export const toggleModalSelector = selector({
  key: 'toggleModal',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenModal = get(A.isOpenAddModalState);
    const isOpenDetailModal = get(A.isOpenDetailModalState);
    const isOpenByDateDetailModal = get(A.isOpenByDateDetailModalState);

    if (flag === 'add' && isOpenModal) {
      set(A.isOpenAddModalState, false);
    } else if (flag === 'add' && !isOpenModal) {
      set(A.isOpenAddModalState, true);
    } else if (flag === 'detail' && isOpenDetailModal) {
      set(A.isOpenDetailModalState, false);
    } else if (flag === 'detail' && !isOpenDetailModal) {
      set(A.isOpenDetailModalState, true);
    } else if (flag === 'byDateDetail' && isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, false);
    } else if (flag === 'byDateDetail' && !isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, true);
    } else return;
  },
});

export const toggleToastSelector = selector({
  key: 'toggleToast',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenToast = get(A.isOpenToastState);

    if (isOpenToast) {
      set(A.isOpenToastState, false);
    } else {
      set(A.isOpenToastState, true);
    }
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenCalendar = get(A.isOpenCalendarState);
    const isOpenByDateCalendar = get(A.isOpenByDateCalendarState);
    const isOpenByWeekCalendar = get(A.isOpenByWeekCalendarState);

    if (flag === 'add' && isOpenCalendar) {
      set(A.isOpenCalendarState, false);
    } else if (flag === 'add' && !isOpenCalendar) {
      set(A.isOpenCalendarState, true);
    } else if (flag === 'byDate' && isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, false);
    } else if (flag === 'byDate' && !isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, true);
    } else if (flag === 'byWeek' && isOpenByWeekCalendar) {
      set(A.isOpenByWeekCalendarState, false);
    } else if (flag === 'byWeek' && !isOpenByWeekCalendar) {
      set(A.isOpenByWeekCalendarState, true);
    } else return;
  },
});

export const toggleTagPopupSelector = selector({
  key: 'toggleTagPopup',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenTagPopup = get(A.isOpenTagPopupState);

    if (isOpenTagPopup) {
      set(A.isOpenTagPopupState, false);
    } else {
      set(A.isOpenTagPopupState, true);
    }
  },
});
