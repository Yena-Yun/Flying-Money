import { selector } from 'recoil';
import * as A from '../atom/openState';

export const toggleModalSelector = selector({
  key: 'toggleModals',
  get: () => {
    return 'addModal' || 'byAll' || 'byDate' || 'tagModal' || 'tagPopup';
  },
  set: ({ get, set }, flag) => {
    const isOpenAddModal = get(A.isOpenAddModalState);
    const isOpenDetailModal = get(A.isOpenAllDetailModalState);
    const isOpenByDateDetailModal = get(A.isOpenByDateDetailModalState);
    const isOpenTagModalState = get(A.isOpenTagModalState);
    const isOpenTagPopup = get(A.isOpenTagPopupState);

    if (flag === 'addModal') {
      set(A.isOpenAddModalState, !isOpenAddModal);
    } else if (flag === 'byAll') {
      set(A.isOpenAllDetailModalState, !isOpenDetailModal);
    } else if (flag === 'byDate') {
      set(A.isOpenByDateDetailModalState, !isOpenByDateDetailModal);
    } else if (flag === 'tagModal') {
      set(A.isOpenTagModalState, !isOpenTagModalState);
    } else if (flag === 'tagPopup') {
      set(A.isOpenTagPopupState, !isOpenTagPopup);
    } else return;
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {
    return 'add' || 'byDate';
  },
  set: ({ get, set }, flag) => {
    const isOpenAddCalendar = get(A.isOpenAddCalendarState);
    const isOpenByDateCalendar = get(A.isOpenByDateCalendarState);

    if (flag === 'add') {
      set(A.isOpenAddCalendarState, !isOpenAddCalendar);
    } else if (flag === 'byDate') {
      set(A.isOpenByDateCalendarState, !isOpenByDateCalendar);
    } else return;
  },
});

export const toggleToastSelector = selector({
  key: 'toggleToast',
  get: () => {
    return 'byAll' || 'byDate' || 'tag';
  },
  set: ({ get, set }, flag) => {
    const isOpenDeleteByAllToast = get(A.isOpenDeleteByAllToastState);
    const isOpenDeleteByDateToast = get(A.isOpenDeleteByDateToastState);
    const isOpenDeleteTagToast = get(A.isOpenDeleteTagToastState);

    if (flag === 'byAll') {
      set(A.isOpenDeleteByAllToastState, !isOpenDeleteByAllToast);
    } else if (flag === 'byDate') {
      set(A.isOpenDeleteByDateToastState, !isOpenDeleteByDateToast);
    } else if (flag === 'tag') {
      set(A.isOpenDeleteTagToastState, !isOpenDeleteTagToast);
    } else return;
  },
});
