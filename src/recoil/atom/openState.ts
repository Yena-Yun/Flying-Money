import { atom } from 'recoil';

export const isOpenAddModalState = atom({
  key: 'isOpenAddModal',
  default: false,
});

export const isOpenAllDetailModalState = atom({
  key: 'isOpenAllDetailModal',
  default: false,
});

export const isOpenByDateDetailModalState = atom({
  key: 'isOpenByDateDetailModal',
  default: false,
});

export const isOpenTagModalState = atom({
  key: 'isOpenTagModal',
  default: false,
});

export const isOpenDeleteExpenseToastState = atom({
  key: 'isOpenDeleteExpenseToast',
  default: false,
});

export const isOpenDeleteTagToastState = atom({
  key: 'isOpenDeleteTagToast',
  default: false,
});

export const isOpenAddCalendarState = atom({
  key: 'isOpenAddCalendar',
  default: false,
});

export const isOpenByDateCalendarState = atom({
  key: 'isOpenByDateCalendar',
  default: false,
});

export const isOpenTagPopupState = atom({
  key: 'isOpenTagPopup',
  default: false,
});
