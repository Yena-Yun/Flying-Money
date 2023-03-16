import { atom } from 'recoil';
import { TTab } from 'types';

export const clickedTransactionIndexState = atom({
  key: 'clickedTransactionIndex',
  default: '',
});

export const clickedListIndexState = atom({
  key: 'clickedListIndex',
  default: '',
});

export const clickedTagPopupIndexState = atom({
  key: 'clickedTagPopupIndex',
  default: '',
});

export const deleteTagIndexState = atom({
  key: 'deleteTagIndex',
  default: '',
});

export const clickedTabNameState = atom<TTab.TabMenuIdType>({
  key: 'clickedTabName',
  default: 'all',
});

export const weekButtonIndexState = atom({
  key: 'weekButtonIndex',
  default: 0,
});
