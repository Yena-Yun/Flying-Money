import { selector } from 'recoil';
import * as A from '../atom/openState';

export const toggleModalSelector = selector({
  key: 'toggleModals',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenModal = get(A.isOpenAddModalState);
    const isOpenDetailModal = get(A.isOpenAllDetailModalState);
    const isOpenByDateDetailModal = get(A.isOpenByDateDetailModalState);

    if (flag === 'addModal' && isOpenModal) {
      set(A.isOpenAddModalState, false);
    } else if (flag === 'addModal' && !isOpenModal) {
      set(A.isOpenAddModalState, true);
    } else if (flag === 'allDetail' && isOpenDetailModal) {
      set(A.isOpenAllDetailModalState, false);
    } else if (flag === 'allDetail' && !isOpenDetailModal) {
      set(A.isOpenAllDetailModalState, true);
    } else if (flag === 'byDateDetail' && isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, false);
    } else if (flag === 'byDateDetail' && !isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, true);
    } else return;
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenAddCalendar = get(A.isOpenAddCalendarState);
    const isOpenByDateCalendar = get(A.isOpenByDateCalendarState);

    if (flag === 'add' && isOpenAddCalendar) {
      set(A.isOpenAddCalendarState, false);
    } else if (flag === 'add' && !isOpenAddCalendar) {
      set(A.isOpenAddCalendarState, true);
    } else if (flag === 'byDate' && isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, false);
    } else if (flag === 'byDate' && !isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, true);
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
