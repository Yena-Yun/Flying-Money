import { atom } from 'recoil';
import { Transaction } from 'types/types';

export const isOpenModalState = atom({
  key: 'isOpenModal',
  default: false,
});

export const isOpenCalendarState = atom({
  key: 'isOpenCalendar',
  default: false,
});

export const clickedTabState = atom({
  key: 'clickedTab',
  default: '',
});

export const expenseListState = atom<Transaction[]>({
  key: 'expenseList',
  default: [],
});
