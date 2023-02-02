import { atom } from 'recoil';
import { Item, TabMenuIdType, Tag, Transaction } from 'types/types';
import uuid4 from 'uuid4';

export const isOpenModalState = atom({
  key: 'isOpenModal',
  default: false,
});

export const isOpenDetailModalState = atom({
  key: 'isOpenDetailModal',
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

export const clickedExpenseIndexState = atom({
  key: 'clickedExpenseCard',
  default: '',
});

export const clickedTabState = atom<TabMenuIdType>({
  key: 'clickedTab',
  default: 'all',
});

export const selectedDateState = atom({
  key: 'selectedDate',
  default: new Date(),
});

export const expenseListState = atom<Item[]>({
  key: 'expenseList',
  default: [{ id: uuid4(), name: '', price: 0, tag: '' }],
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
