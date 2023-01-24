import { atom } from 'recoil';
import { Item, Transaction } from 'types/types';

export const isOpenModalState = atom({
  key: 'isOpenModal',
  default: false,
});

export const isOpenCalendarState = atom({
  key: 'isOpenCalendar',
  default: false,
});

export const clickedTabState = atom<string>({
  key: 'clickedTab',
  default: 'all',
});

export const selectedDateState = atom({
  key: 'selectedDate',
  default: new Date(),
});

export const filteredWeekState = atom({
  key: 'filteredWeek',
  default: {
    start: '',
    end: '',
  },
});

export const expenseListState = atom<Item[]>({
  key: 'expenseList',
  default: [],
});

export const transactionState = atom<Transaction>({
  key: 'transaction',
  default: {
    id: '',
    date: new Date(),
    title: '',
    items: [],
  },
});

export const transactionListState = atom<Transaction[]>({
  key: 'transactionList',
  default: [],
});
