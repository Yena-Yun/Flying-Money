import { atom } from 'recoil';
import uuid4 from 'uuid4';
import * as T from 'types/types';

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

export const isOpenTagPopupState = atom({
  key: 'isOpenTagPopup',
  default: false,
});

export const addModalDateState = atom({
  key: 'addModalDate',
  default: new Date(),
});

export const byDateSelectedDateState = atom({
  key: 'filterByDateSelectedDate',
  default: new Date(),
});

export const byWeekStartDateState = atom({
  key: 'filterByWeekStartDate',
  default: new Date(),
});

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

export const clickedTabNameState = atom<T.TabMenuIdType>({
  key: 'clickedTabName',
  default: 'all',
});
