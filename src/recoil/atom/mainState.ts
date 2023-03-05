import { atom } from 'recoil';
import uuid4 from 'uuid4';
import { TMain } from 'types';

export const itemState = atom<TMain.ItemType[]>({
  key: 'item',
  default: [{ id: uuid4(), name: '', price: 0, tag: '' }],
});

export const listState = atom<TMain.ListType>({
  key: 'list',
  default: {
    id: uuid4(),
    title: '',
    items: [],
    diaries: [],
  },
});

export const transactionState = atom<TMain.TransactionType>({
  key: 'transaction',
  default: {
    id: uuid4(),
    date: new Date(),
    lists: [],
  },
});

export const transactionListState = atom<TMain.TransactionType[]>({
  key: 'transactionList',
  default: [],
});

export const savedTagGroupState = atom<TMain.TagType[]>({
  key: 'savedTagGroup',
  default: [],
});

export const totalPerListState = atom({
  key: 'totalPerList',
  default: 0,
});

export const totalPerDateState = atom({
  key: 'totalPerDateAll',
  default: 0,
});

export const totalPerWeekState = atom({
  key: 'totalPerWeek',
  default: 0,
});

export const totalPerMonthState = atom({
  key: 'totalPerMonth',
  default: 0,
});
