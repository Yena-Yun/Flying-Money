import { atom } from 'recoil';
import {
  ItemType,
  ListType,
  TabMenuIdType,
  TagType,
  TransactionType,
} from 'types/types';
import uuid4 from 'uuid4';

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

export const isOpenCalendarState = atom({
  key: 'isOpenCalendar',
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

export const addModalSelectedDateState = atom({
  key: 'addModalSelectedDate',
  default: new Date(),
});

export const filterByDateSelectedDateState = atom({
  key: 'filterByDateSelectedDate',
  default: new Date(),
});

export const filterByWeekStartDateState = atom({
  key: 'filterByWeekStartDate',
  default: new Date(),
});

export const transactionState = atom<TransactionType>({
  key: 'transaction',
  default: {
    id: uuid4(),
    date: new Date(),
    lists: [],
  },
});

export const listState = atom<ListType>({
  key: 'list',
  default: {
    id: uuid4(),
    title: '',
    items: [],
    diaries: [],
  },
});

export const itemState = atom<ItemType[]>({
  key: 'listItem',
  default: [{ id: uuid4(), name: '', price: 0, tag: '' }],
});

export const transactionListState = atom<TransactionType[]>({
  key: 'transactionList',
  default: [],
});

export const savedTagGroupState = atom<TagType[]>({
  key: 'savedTagGroup',
  default: [],
});

export const isOpenTagPopupState = atom({
  key: 'isOpenTagPopup',
  default: false,
});

export const clickedIndexState = atom({
  key: 'clickedIndex',
  default: '',
});

export const clickedItemIndexState = atom({
  key: 'clickedItemIndex',
  default: '',
});

export const clickedTagPopupIndexState = atom({
  key: 'clickedTagPopupIndex',
  default: '',
});

export const clickedTabNameState = atom<TabMenuIdType>({
  key: 'clickedTabName',
  default: 'all',
});
