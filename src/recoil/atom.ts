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

export const expenseListState = atom<Transaction[]>({
  key: 'expenseList',
  default: [],
});

export const selectedDateState = atom({
  key: 'selectedDate',
  default: new Date(),
});

export const expenseItemState = atom<Item>({
  key: 'expenseItem',
  default: {
    name: '',
    price: 0,
  },
});

export const transactionState = atom<Transaction>({
  key: 'transaction',
  default: {
    id: '',
    date: new Date(),
    title: '',
    items: { name: '', price: 0 },
  },
});
