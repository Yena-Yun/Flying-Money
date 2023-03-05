import { atom } from 'recoil';

export const isOpenAddModalState = atom({
  key: 'isOpenAddModal',
  default: false,
});

export const isOpenDetailModalState = atom({
  key: 'isOpenDetailModal',
  default: false,
});

export const isOpenByDateDetailModalState = atom({
  key: 'isOpenByDateDetailModal',
  default: false,
});

export const isOpenToastState = atom({
  key: 'isOpenToast',
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

export const isOpenByWeekCalendarState = atom({
  key: 'isOpenByWeekCalendar',
  default: false,
});

export const isOpenTagPopupState = atom({
  key: 'isOpenTagPopup',
  default: false,
});
