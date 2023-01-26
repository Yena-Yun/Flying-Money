import { atom } from 'recoil';
import { Item, Tag, Transaction } from 'types/types';

export const isOpenModalState = atom({
  key: 'isOpenModal',
  default: false,
});

export const isOpenCalendarState = atom({
  key: 'isOpenCalendar',
  default: false,
});

export const isOpenTagPopupState = atom({
  key: 'isOpenTagPopup',
  default: false,
});

export const savedTagGroupState = atom<Tag[]>({
  key: 'savedTagGroup',
  default: [],
});

export const clickedTagPopupIndexState = atom({
  key: 'clickedTagPopupIndex',
  default: '',
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
