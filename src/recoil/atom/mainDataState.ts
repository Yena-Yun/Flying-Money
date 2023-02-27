import { atom } from 'recoil';
import uuid4 from 'uuid4';
import * as T from 'types';

export const itemState = atom<T.ItemType[]>({
  key: 'item',
  default: [{ id: uuid4(), name: '', price: 0, tag: '' }],
});

export const listState = atom<T.ListType>({
  key: 'list',
  default: {
    id: uuid4(),
    title: '',
    items: [],
    diaries: [],
  },
});

export const transactionState = atom<T.TransactionType>({
  key: 'transaction',
  default: {
    id: uuid4(),
    date: new Date(),
    lists: [],
  },
});

export const transactionListState = atom<T.TransactionType[]>({
  key: 'transactionList',
  default: [],
});

export const savedTagGroupState = atom<T.TagType[]>({
  key: 'savedTagGroup',
  default: [],
});
