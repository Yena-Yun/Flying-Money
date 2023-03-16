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
    const isOpenTagModalState = get(A.isOpenTagModalState);
    const isOpenTagPopup = get(A.isOpenTagPopupState);

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
    } else if (flag === 'tagModal' && isOpenTagModalState) {
      set(A.isOpenTagModalState, false);
    } else if (flag === 'tagModal' && !isOpenTagModalState) {
      set(A.isOpenTagModalState, true);
    } else if (flag === 'tagPopup' && isOpenTagPopup) {
      set(A.isOpenTagPopupState, false);
    } else if (flag === 'tagPopup' && !isOpenTagPopup) {
      set(A.isOpenTagPopupState, true);
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

export const toggleToastSelector = selector({
  key: 'toggleToast',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenToast = get(A.isOpenToastState);

    isOpenToast
      ? set(A.isOpenToastState, false)
      : set(A.isOpenToastState, true);
  },
});
